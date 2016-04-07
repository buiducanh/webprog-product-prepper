// Implement your server in this file.
// We should be able to run your server with node src/server.js
// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
var _ = require('lodash');
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
var geolib = require('geolib');

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

function getUserData (user) {
  var userData = readDocument('users', user);
  return userData;
}

app.get('/user/:userid', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // userid is a string. We need it to be a number.
  // Parameters are always strings.
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
    // Send response.
    res.send(getUserData(useridNumber));
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

function getAllUserData () {
  var userData = readAllCollection('users');
  return userData;
}

app.get('/user', function(req, res) {
  res.send(getAllUserData());
});

function getInterviewSession(interviewId){
  var interviewItem = readDocument('interviewSessions', interviewId);
  // Resolve participants
  interviewItem.interviewer = readDocument('users', interviewItem.interviewer);
  interviewItem.interviewee = readDocument('users', interviewItem.interviewee);
  // Resolve problem
  interviewItem.problem = readDocument('problems', interviewItem.problem);
  return interviewItem;
}

function postInterviewSession(interviewerId) {
  // Get the current UNIX time.
  var time = new Date().getTime();
  var intervieweeId = 2; // TODO random this number
  //TODO random role????
  var interviewItem =
  {
    "problem": 1,
    "feedback": undefined,
    "interviewer": interviewerId,
    "interviewee": intervieweeId,
    "timestamp": time,
    "duration": "",
    "code" : "",
    "result": "WIP"
  };
  interviewItem = addDocument('interviewSessions', interviewItem);

  var interviewee = readDocument("users", intervieweeId);
  var interviewer = readDocument("users", interviewerId);
  interviewee.interview.push(interviewItem._id);
  interviewer.interview.push(interviewItem._id);
  writeDocument("users", interviewee);
  writeDocument("users", interviewer);

  // Resolve participants
  interviewItem.interviewer = readDocument('users', interviewItem.interviewer);
  interviewItem.interviewee = readDocument('users', interviewItem.interviewee);
  // Resolve problem
  interviewItem.problem = readDocument('problems', interviewItem.problem);
  return interviewItem;
}

app.post('/interview', validate({body: InterviewSessionSchema}), function(req, res) {
  // If this function runs, `req.body` passed JSON validation!
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var interviewerId = parseInt(body.interviewer, 10);
  // Check if requester is authorized to post this status update.
  // (The requester must be the author of the update.)
  if (fromUser === interviewerId) {
    var newUpdate = postInterviewSession(interviewerId);
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

app.get('/interview/:interviewid', function(req, res) {
  var intId = parseInt(req.params.interviewid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // userid is a string. We need it to be a number.
  // Parameters are always strings.
  var userId = parseInt(req.query.user, 10);
  if (fromUser === userId) {
    // Send response.
    res.send(getInterviewSession(intId));
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
 * Searches for userprofile with the given text.
 */

 app.post('/searchpeople', function(req, res) {
   var queryText = req.query.searchTerm;

    var userData = readAllCollection('users');
    userData = _.filter(userData, (user) => { return _.includes(_.lowerCase(user.fullName), _.lowerCase(queryText)); });

     res.send(userData);
 });

/**
 * HONORS FEATURES
 */
function deleteChatMember(chatSessionId, userId) {
  var chatSession = readDocument("chatSessions", chatSessionId);
  var indexOfUser = chatSession.memberLists.indexOf(userId);
  chatSession.memberLists.splice(indexOfUser, 1);
  writeDocument('chatSessions', chatSession);
  return getChatSessionsSync(chatSessionId);
}

app.delete('/chatsession/:chatid/memberlists/:userid', function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var chatId = parseInt(req.params.chatid, 10);
  var userId = parseInt(req.params.userid, 10);
  var authId = parseInt(req.query.user, 10);
  if (fromUser === authId) {
    var chatSession = deleteChatMember(chatId, userId);
    res.send(chatSession);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

function addChatMember(chatSessionId, userId) {
  var chatSession = readDocument("chatSessions", chatSessionId);
  chatSession.memberLists.push(userId);
  writeDocument('chatSessions', chatSession);
  return getChatSessionsSync(chatSessionId);
}

app.put('/chatsession/:chatid/memberlists/:userid', function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var chatId = parseInt(req.params.chatid, 10);
  var userId = parseInt(req.params.userid, 10);
  var authId = parseInt(req.query.user, 10);
  if (fromUser === authId) {
    var chatSession = addChatMember(chatId, userId);
    res.send(chatSession);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

function deleteNotification(notificationId) {
  var notification = readDocument("notifications", notificationId);
  deleteDocument("notifications", notificationId);
  notification.requester = readDocument("users", notification.requester);
  notification.chatSession = readDocument("chatSessions", notification.chatSession);
  return notification;
}

app.delete('/notification/:notificationid', function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var notificationId = parseInt(req.params.notificationid, 10);
  var authId = parseInt(req.query.user, 10);
  if (fromUser === authId) {
    var notification = deleteNotification(notificationId);
    res.send(notification);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

function updateNotificationStatus(notificationId, status) {
  var notification = readDocument("notifications", notificationId);
  notification.status = status;
  writeDocument("notifications", notification);
  notification.requester = readDocument("users", notification.requester);
  notification.chatSession = readDocument("chatSessions", notification.chatSession);
  return notification;
}

app.put('/notification/:notificationid/status/:status', function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var notificationId = parseInt(req.params.notificationid, 10);
  var status = req.params.userid;
  var authId = parseInt(req.query.user, 10);
  if (fromUser === authId) {
    var notification = updateNotificationStatus(notificationId, body.status);
    res.send(notification);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

function postChatMessage(value, chatSessionId, userId) {
  var chatMessage = {
    "content": value,
    "owner": userId,
    "chatSessionId": chatSessionId
  };
  chatMessage = addDocument('chatMessages', chatMessage);
  var chatSession = readDocument('chatSessions', chatSessionId);
  chatSession.chatMessages.push(chatMessage._id);
  writeDocument('chatSessions', chatSession);
  chatMessage.owner = readDocument('users', userId);
  return chatMessage;
}

app.post('/chatmessage', validate({ body: ChatMessageSchema }), function(req, res) {
  // If this function runs, `req.body` passed JSON validation!
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(body.owner, 10);
  var chatId = parseInt(body.chatSessionId, 10);
  // Check if requester is authorized to post this status update.
  // (The requester must be the author of the update.)
  if (fromUser === userId) {
    var newUpdate = postChatMessage(body.content, chatId, userId);
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

function getChatSessions(sessionId) {
  return getChatSessionsSync(sessionId);
}

app.get('/chatsession/:chatid', function(req, res) {
  var chatId = parseInt(req.params.chatid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(req.query.user, 10);
  if (fromUser === userId) {
    // Send response.
    res.send(getChatSessions(chatId));
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

function getChatSessionsSync(sessionId) {
  var session = readDocument('chatSessions', sessionId);
  session.initiator = readDocument('users', session.initiator);
  session.memberLists = session.memberLists.map((member) => {
    return readDocument('users', member);
  });
  session.chatMessages = session.chatMessages.map((message) => {
    var messageObj = readDocument('chatMessages', message);
    messageObj.owner = readDocument('users', messageObj.owner);
    return messageObj;
  });
  return session;
}

function postNotifications(requester, requestee) {
  var chatSession = _.find(readAllCollection("chatSessions"), (chat) => {
    return chat.initiator === requester;
  });
  var newNoti = {
    requester: requester,
    requestee: requestee,
    chatSession: chatSession._id,
    status: "waiting"
  }
  var notiData = addDocument("notifications", newNoti);
  notiData.requester = readDocument("users", notiData.requester);
  notiData.chatSession = chatSession;
  return notiData;
}

app.post('/notification', validate({ body: NotificationSchema }), function(req, res) {
  // If this function runs, `req.body` passed JSON validation!
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var requesterId = parseInt(body.requester, 10);
  var requesteeId = parseInt(body.requestee, 10);
  if (fromUser === requesterId) {
    var newUpdate = postNotifications(requesterId, requesteeId);
    res.status(201);
     // Send the update!
    res.send(newUpdate);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

function getOnlineUsers() {
  var onlineUsers = readDocument('onlineUsers', 1);
  onlineUsers = onlineUsers.map((user) => {
    return readDocument("users", user);
  });
  return onlineUsers;
}

app.get('/user/:userid/online', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(req.params.userid, 10);
  if (fromUser === userId) {
    // Send response.
    res.send(getOnlineUsers());
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

function getNearbyUsers(radius, userId) {
  var userData = readAllCollection('users');
  var currentUser = userData[userId - 1];
  userData.splice(userId - 1, 1);
  var nearbyUsers = [];
  for(var i = 0; i < userData.length; i++) {
    var curLatLng = {
      latitude: currentUser.position.lat,
      longitude: currentUser.position.lng,
    };
    var otherLatLng = {
      latitude: userData[i].position.lat,
      longitude: userData[i].position.lng,
    };
    var distance = geolib.getDistance(curLatLng, otherLatLng);
    if (distance <= radius) {
      nearbyUsers.push(userData[i]);
    }
  }
  return nearbyUsers;
}

app.get('/user/:userid/nearby', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(req.params.userid, 10);
  var radius = parseInt(req.query.radius, 10);
  if (!_.isNumber(radius) || _.isNaN(radius)) {
    radius = 10000; // default radius
  }
  if (fromUser === userId) {
    // Send response.
    res.send(getNearbyUsers(radius, userId));
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

function getNotifications(userId) {
  var notifications = readAllCollection('notifications');
  notifications = _.filter(notifications, function(o) { return o.requestee == userId;});
  notifications = notifications.map((noti) => {
    noti.requester = readDocument("users", noti.requester);
    return noti;
  });
  notifications = notifications.map((noti) => {
    noti.chatSession = readDocument("chatSessions", noti.chatSession);
    return noti;
  });
  return notifications;
}

app.get('/user/:userid/notification', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(req.params.userid, 10);
  if (fromUser === userId) {
    // Send response.
    res.send(getNotifications(userId));
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});
/**
 * HONORS FEATURES
 */

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
