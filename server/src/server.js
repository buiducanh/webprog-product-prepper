// Implement your server in this file.
// We should be able to run your server with node src/server.js
// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
var bodyParser = require('body-parser');
var validate = require('express-jsonschema').validate;
var FeedbackSchema = require('./schemas/feedback.json');
var InterviewSessionSchema = require('./schemas/interviewsession.json');
var InterviewSchema = require('./schemas/interview.json');
var ChatMessageSchema = require('./schemas/chatmessage.json');
var NotificationSchema = require('./schemas/notification.json');
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var readAllCollection = database.readAllCollection;

var lodash = require ('lodash');
var _ = lodash._;

// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());

/**
 * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
 */
function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number.
    if (typeof id === 'number') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}

function getInterviewSession(interviewId, cb){
  var interviewItem = readDocument('interviewSessions', interviewId);
  // Resolve participants
  interviewItem.interviewer = readDocument('users', interviewItem.interviewer);
  interviewItem.interviewee = readDocument('users', interviewItem.interviewee);
  // Resolve problem
  interviewItem.problem = readDocument('problems', interviewItem.problem);
  emulateServerReturn(interviewItem, cb);
}

function postFeedbackData(feedbackData) {
  // dummy = {_id: 1, text: "dummy"}
  feedbackData.timestamp = new Date().getTime();
  var newFeedback = addDocument("feedbacks", feedbackData);
  var interviewSession = readDocument("interviewSessions", feedbackData.interview_session);
  interviewSession.feedback = newFeedback._id;
  writeDocument("interviewSessions", interviewSession);
  return newFeedback;
}
function getInterviewDataSync(interviewId) {
  var interviewItem = readDocument('interviewSessions', interviewId);
  // Resolve participants
  interviewItem.interviewer = readDocument('users', interviewItem.interviewer);
  interviewItem.interviewee = readDocument('users', interviewItem.interviewee);
  // Resolve feedback
  if (interviewItem.feedback === undefined) {
    interviewItem.feedback = {
      "interviewer": "",
      "interviewee": "",
      "interviewer_pro": "",
      "interviewer_con": "",
      "interviewer_comment": "",
      "interviewer_rating": "",
      "interviewee_pro": "",
      "interviewee_con": "",
      "interviewee_comment": "",
      "interviewee_rating": "",
      "interview_session": "",
      "timestamp": ""
    }
  }
  else {
    interviewItem.feedback = readDocument('feedbacks', interviewItem.feedback);
  }
  // Resolve problem
  interviewItem.problem = readDocument('problems', interviewItem.problem);
  return interviewItem;
}

/**
 * Emulates a REST call to get the feed data for a particular user.
 * @param user The ID of the user whose feed we are requesting.
 * @param cb A Function object, which we will invoke when the Feed's data is available.
 */
function getInterviewData(user) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  // Get the Feed object for the user.
  var interviewData = userData.interview.map(getInterviewDataSync);
  return interviewData;
}

app.get('/user/:userid/interviews', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // userid is a string. We need it to be a number.
  // Parameters are always strings.
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
    // Send response.
    res.send(getInterviewData(userid));
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

app.get('/interview/:interviewId', function(req, res) {
   var userid = req.params.userid;
   var fromUser = getUserIdFromToken(req.get('Authorization'));
   // userid is a string. We need it to be a number.
   // Parameters are always strings.
   var useridNumber = parseInt(userid, 10);
   if (fromUser === useridNumber) {
     // Send response.
     res.send(getInterviewSession(userid));
   } else {
     // 401: Unauthorized request.
     res.status(401).end();
   }
 });

app.post('/feedback', validate({ body: FeedbackSchema }), function(req, res) {
    // If this function runs, `req.body` passed JSON validation!
  var body = req.body;
  //var feedbackId = parseInt(req.params.feedbackid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));

  // Check if requester is authorized to post this status update.
  // (The requester must be the author of the update.)
  if (fromUser === Number(body.author)) {
    var newUpdate = postFeedbackData(body);
    // When POST creates a new resource, we should tell the client about it
    // in the 'Location' header and use status code 201.
    res.status(201);
     // Send the update!
    res.send(newUpdate);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

//route for interview
app.post('interview/:interviewId', validate({ body: InterviewSchema }), function(req, res) {
    // If this function runs, `req.body` passed JSON validation!
  var body = req.body;
  //var feedbackId = parseInt(req.params.feedbackid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));

  // Check if requester is authorized to post this status update.
  // (The requester must be the author of the update.)
  if (fromUser === Number(body.author)) {
    var newUpdate = getInterviewData(body);
    // When POST creates a new resource, we should tell the client about it
    // in the 'Location' header and use status code 201.
    res.status(201);
     // Send the update!
    res.send(newUpdate);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
});


// You run the server from `server`, so `../client/build` is `server/../client/build`.
// '..' means "go up one directory", so this translates into `client/build`!
app.use(express.static('../client/build'));

/**
 * Searches for feed items with the given text.
 */

 app.post('/searchpeople', function(req, res) {
   var queryText = req.query.searchTerm;

    var userData = readAllCollection('users');
    userData = _.filter(userData, (user) => { return _.includes(_.lowerCase(user.fullName), _.lowerCase(queryText)); });

     res.send(userData);
 });

/**
 * Translate JSON Schema Validation failures into error 400s.
 */
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    // Set a bad request http response status
    res.status(400).end();
  } else {
    // It's some other sort of error; pass it to next error middleware handler
    next(err);
  }
});

// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('Prepper listening on port 3000!');
});
