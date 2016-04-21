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
var EndInterviewSchema = require('./schemas/endinterview.json');
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var readAllCollection = database.readAllCollection;
var geolib = require('geolib');
var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/prepper';
var ResetDatabase = require('./resetdatabase');

MongoClient.connect(url, function(err, db) {
  // CONFIGS
  // Support receiving text in HTTP request bodies
  app.use(bodyParser.text());
  // Support receiving JSON in HTTP request bodies
  app.use(bodyParser.json());
  // You run the server from `server`, so `../client/build` is `server/../client/build`.
  // '..' means "go up one directory", so this translates into `client/build`!
  app.use(express.static('../client/build'));
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

  // ROUTES
  app.use('/mongo_express', mongo_express(mongo_express_config));
  /**
   * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
   */
  function generateObjectID(number) {
    var result = number.toString();
    while (result.length < 24) {
      result = "0".concat(result);
    }
    return new ObjectID(result);
  }
  function getUserIdFromToken(authorizationLine) {
    try {
      // Cut off "Bearer " from the header value.
      var token = authorizationLine.slice(7);
      // Convert the base64 string to a UTF-8 string.
      var regularString = new Buffer(token, 'base64').toString('utf8');
      // Convert the UTF-8 string into a JavaScript object.
      var tokenObj = JSON.parse(regularString);
      var id = tokenObj['id'];
      // Check that id is a string.
      if (typeof id === 'string') {
        return id;
      } else {
        // Not a number. Return "", an invalid ID.
        return "";
      }
    } catch (e) {
      // Return an invalid ID.
      return -1;
    }
  }

  function sendDatabaseError(res, err) {
    res.status(500).send("A database error occurred: " + err);
  }
  // Tien
  function getUserData (user, callback) {
    // var userData = readDocument('users', user);
    // return userData;

    db.collection ('users').findOne ({ _id: user }, function (err, user) {
      if (err) {
        return callback (err);
      }
      callback (null, user);
    });
  }

  // Tien
  app.get('/user/:userid', function(req, res) {
    var userid = req.params.userid;

    // userid is a string. We need it to be a number.
    // Parameters are always strings.
    var useridNumber = userid;

      getUserData(new ObjectID (useridNumber), function (err, user) {
        if (err) {
          res.status (500).send ("Database erro: " + err);
        } else if (user === null) {
          res.status(400).send ("Could not look up data for user " + userid);
        } else {
          res.send(user);
        }
      });

  });

      // Send response.
    //   res.send(getUserData(useridNumber));
    // } else {
    //   // 401: Unauthorized request.
    //   res.status(401).end();
    // }

  // Tien
  function getAllUserData (callback) {
    // var userData = readAllCollection('users');
    // return userData;

        var query = { };

        db.collection('users').find(query).toArray(function(err, users) {
          if (err) {
            return callback(err);
          }
          callback(null, users);
        });
  }

  // Tien
  app.get('/user', function(req, res) {
    //res.send(getAllUserData());

    getAllUserData (function(err, users) {
      if (err) {
        res.status(500).send("Database error: " + err);
      } else {
        res.send (users);
      }
    });
  });


  // Ngan || Thanh || Tri (done, not tested)
  function getInterviewSession(interviewId) {
    // var interviewItem = readDocument('interviewSessions', interviewId);
    // // Resolve participants
    // interviewItem.interviewer = readDocument('users', interviewItem.interviewer);
    // interviewItem.interviewee = readDocument('users', interviewItem.interviewee);
    // // Resolve problem
    // interviewItem.problem = readDocument('problems', interviewItem.problem);
    // return interviewItem;
    db.collection('interviewSessions').findOne({ _id: interviewId }, function(err, interviewItem) {
        if (err) {
          return callback(err);
        }
        var interviews = [interviewItem];
        resolveInterviews(interviews, function(err, resolved) {
            if (err) {
              return sendDatabaseError(err);
            }
            return resolved[0];
        });
      });
    }

  // Ngan || Thanh || Tri  (WIP)
  function postInterviewSession(interviewerId, callback) {
    // //TODO random role????
    // var interviewItem =
    // {
    //   "problem": 1,
    //   "feedback": undefined,
    //   "interviewer": interviewerId,
    //   "interviewee": intervieweeId,
    //   "timestamp": time,
    //   "duration": "",
    //   "code" : "",
    //   "result": "WIP"
    // };
    // interviewItem = addDocument('interviewSessions', interviewItem);
    //
    // var interviewee = readDocument("users", intervieweeId);
    // var interviewer = readDocument("users", interviewerId);
    // interviewee.interview.push(interviewItem._id);
    // interviewer.interview.push(interviewItem._id);
    // writeDocument("users", interviewee);
    // writeDocument("users", interviewer);
    //
    // // Resolve participants
    // interviewItem.interviewer = readDocument('users', interviewItem.interviewer);
    // interviewItem.interviewee = readDocument('users', interviewItem.interviewee);
    // // Resolve problem
    // interviewItem.problem = readDocument('problems', interviewItem.problem);
    // return interviewItem;
    var time = new Date().getTime();
    var intervieweeId = new ObjectID("000000000000000000000002"); // TODO random this number
    var interviewItem =
    {
      "problem": generateObjectID(1),
      "feedback": undefined,
      "interviewer": interviewerId,
      "interviewee": intervieweeId,
      "timestamp": time,
      "duration": "",
      "code" : "",
      "result": "WIP"
    };
    db.collection('interviewSessions').insertOne(interviewItem, function(err, resultObj) {
      if (err) {
        return callback(err);
      }
      var interviewItemId = resultObj.insertedId;
      interviewItem._id = interviewItemId;
      // Update interviewer's interview array
      db.collection('users').updateOne({ _id: interviewerId },
      {
        $push: {
          interview: {
            interviewItemId
          }
        }
      },
      function(err) {
        if (err) {
          return sendDatabaseError(err);
        }
        // Include with the document's inserted id
        var interviewItemId = resultObj.insertedId;
        interviewItem._id = interviewItemId;
        // Update interviewer's interview array
        db.collection('users').updateOne({ _id: interviewerId },
        {
          $push: {
            interview: interviewItemId
          }
        },
        function(err) {
          if (err) {
            return callback(err);
          }
          // Update interviewee's interview array
          db.collection('users').updateOne({ _id: intervieweeId },
          {
            $push: {
              interview: interviewItemId
            }
          },
          function(err) {
            if (err) {
              return callback(err);
            }
            // Resolve interview item and return
            var interviews = [interviewItem];
            resolveInterviews(interviews, function(err, resolved) {
              if (err) {
                return callback(err);
              }
              return callback(null, resolved[0]);
            });
          });
        });
      });
    });
  }

  // Ngan || Thanh || Tri  (FIXED)
  app.post('/interview', validate({body: InterviewSessionSchema}), function(req, res) {
       var body = req.body;
       var fromUser = getUserIdFromToken(req.get('Authorization'));
       var interviewerId = body.interviewer;
       if (fromUser === interviewerId) {
         postInterviewSession(new ObjectID(interviewerId), function(err, newUpdate) {
           if (err) {
              return sendDatabaseError(err);
           } else {
             res.status(201);
             res.send(newUpdate);
           }
         });
       } else {
          // 401: Unauthorized.
          res.status(401).end();
        }
  });




  // Thanh || Tri
  function postAfterInterviewData(interviewData) {
    // dummy = {_id: 1, text: "dummy"}
    // var interviewSession = readDocument("interviewSessions", interviewData.interviewId);
    // interviewSession.code = interviewData.code;
    // interviewSession.duration = interviewData.duration;
    // writeDocument("interviewSessions", interviewSession);
    // return;
    db.collection('interviewSessions').findOne({ _id: interviewData.interviewId }, function(err, interviewSession) {
      if (err) {
        return callback(err);
      }
      interviewSession.code = interviewData.code;
      interviewSession.duration = interviewData.duration;

      db.collection('interviewSessions').updateOne({ _id: interviewSession.interviewId },
      {
        $set: {
          code: interviewSession._id
        }
      },
      function(err) {
        if (err) {
          return callback(err);
        }
      });
    });
  }

  function resolveInterviews(interviews, callback) {
    var resolved = [];
    var interview = {};
    function resolveInterviewer(i) {
      if (i === interviews.length) {
        return callback(null, resolved);
      }
      else {
        interview = interviews[i];
        db.collection('users').findOne({ _id: interview.interviewer}, function(err, userObj) {
          if (err) {
            return callback(err);
          }
          else {
            interview.interviewer = userObj;
            resolved.push(interview);
            resolveInterviewee(i);
          }
        });
      }
    }
    function resolveInterviewee(i) {
      db.collection('users').findOne({ _id: interview.interviewee}, function(err, userObj) {
        if (err) {
          return callback(err);
        }
        else {
          interview.interviewee = userObj;
          resolveProblem(i);
        }
      });
    }
    function resolveProblem(i) {
      db.collection('problems').findOne({ _id: interview.problem}, function(err, problemObj) {
        if (err) {
          return callback(err);
        }
        else {
          interview.problem = problemObj;
          resolveFeedback(i);
        }
      });
    }
    function resolveFeedback(i) {
      if (interview.feedback == null) {
        interview.feedback = {
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
        };
        resolveInterviewer(i + 1);
      }
      else {
        db.collection('feedbacks').findOne({ _id: interview.feedback}, function(err, feedbackObj) {
          if (err) {
            return callback(err);
          }
          else {
            interview.feedback = feedbackObj;
            resolveInterviewer(i + 1);
          }
        });
      }
    }
    return resolveInterviewer(0);
  }

  /**
   * Emulates a REST call to get the feed data for a particular user.
   * @param user The ID of the user whose feed we are requesting.
   * @param cb A Function object, which we will invoke when the Feed's data is available.
   */
  // Anh
  function getInterviewData(user, callback) {
    // Get the User object with the id "user".
    var interviewData = [];
    db.collection('users').findOne({ _id: new ObjectID(user) }, getUserCallback);

    function getUserCallback(err, userObj) {
      if (err) {
        return callback(err);
      }
      var interviewQuery = { $or: userObj.interview.map((id) => { return { _id: id}; })};
      // Get the Interview object for the user.
      db.collection('interviewSessions').find(interviewQuery).toArray(getInterviewsCallback);
    }

    function getInterviewsCallback(err, interviews) {
      if (err) {
        return callback(err);
      }
      return resolveInterviews(interviews, callback);
    }
  }

  // Anh
  app.get('/user/:userid/interviews', function(req, res) {
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // userid is a string. We need it to be a number.
    // Parameters are always strings.
    if (fromUser === userid) {
      // Send response.
      getInterviewData(new ObjectID(userid), function(err, data){
        if (err) {
          // A database error happened.
          // Internal Error: 500.
          return sendDatabaseError(err);
        } else if (data === null) {
          res.status(400).send("Could not look up interviews for user " + userid);
        } else {
          // Send data.
          res.send(data);
        }
      });
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });
  // Thanh || Tri
  app.get('/interview/:interviewid', function(req, res) {
    var intId = req.params.interviewid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // userid is a string. We need it to be a number.
    // Parameters are always strings.
    var userId = req.query.user;
    if (fromUser === userId) {
      // Send response.
      res.send(getInterviewSession(generateObjectID(intId)));
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });

  // Rebecca
  function postFeedbackData(feedbackData, callback) {
    feedbackData.timestamp = new Date().getTime();

    // Add the feedback to the database.
    db.collection('feedbacks').insertOne(feedbackData, feedbackCallback);

    function feedbackCallback(err, newFeedback) {
      if (err) {
        return callback(err);
      }
      db.collection('interviewSessions').updateOne({ _id: newFeedback.interview_session }, {
        $set: { feedback: newFeedback._id
        }
      }, interviewSessionCallback)

      function interviewSessionCallback(err) {
        callback(err, newFeedback);
      }
    }
  }

  // Rebecca
  app.post('/feedback', validate({ body: FeedbackSchema }), function(req, res) {
      // If this function runs, `req.body` passed JSON validation!
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var feedbackData = {
      "interviewer": new ObjectID(body.interviewer),
      "interviewee": new ObjectID(body.interviewee),
      "interviewer_pro": body.interviewer_pro,
      "interviewer_con": body.interviewer_con,
      "interviewer_comment": body.interviewer_comment,
      "interviewer_rating": body.interviewer_rating,
      "interviewee_pro": body.interviewee_pro,
      "interviewee_con": body.interviewee_con,
      "interviewee_comment": body.interviewee_comment,
      "interviewee_rating": body.interviewee_rating,
      "interview_session": new ObjectID(body.interview_session)
    }

    // Check if requester is authorized to post this status update.
    // (The requester must be the author of the update.)
    if (fromUser === body.author) {
      postFeedbackData(feedbackData, function(err, newUpdate) {
        if (err) {
          // A database error happened.
          // 500: Internal error.
          res.status(500).send("A database error occurred: " + err);
        } else {
          // When POST creates a new resource, we should tell the client about it
          // in the 'Location' header and use status code 201.
          res.status(201);
          // Update succeeded! Return the resolved feed item.
          res.send(newUpdate);
        }
      });
    } else {
      // Unauthorized.
      res.status(401).end();
    }
  });

  // Thanh || Tri
  app.post('/endinterview', validate({ body: EndInterviewSchema }), function(req, res) {
      // If this function runs, `req.body` passed JSON validation!
    var body = req.body;
    console.log("OK");
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === body.interviewer_id || fromUser === body.interviewee_id) {
      postAfterInterviewData(body);
      res.status(201);
      res.send();
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });

  // Anh
  // Reset the database.
  app.post('/resetdb', function(req, res) {
    console.log("Resetting database...");
    ResetDatabase(db, function() {
      res.send();
    });
  });

  /**
   * Searches for userprofile with the given text.
   */
  // Tien, look at the create Index part in the workshop to implement this
  app.post('/searchpeople', function(req, res) {
    var queryText = req.query.searchTerm;

    var userData = readAllCollection('users');
    userData = _.filter(userData, (user) => { return _.includes(_.lowerCase(user.fullName), _.lowerCase(queryText)); });

    res.send(userData);
  });

  /**
   * HONORS FEATURES
   */
  function deleteChatMember(chatSessionId, userId, authId, callback) {
    var updateAction = {
      $pull: {
        memberLists: userId
      }
    };
    db.collection('chatSessions').findAndModify({ _id: chatSessionId, initiator: authId }, [], updateAction, { "new": true } , chatSessionCallback);

    function chatSessionCallback(err, chatSession) {
      if (err) {
        return callback(err);
      }
      resolveChatSession(chatSession.value, callback);
    }
  }

  function resolveChatSession(chatSession, callback) {
    db.collection('users').findOne({ _id: chatSession.initiator }, userCallback);
    function userCallback(err, userObj) {
      if (err) {
        return callback(err);
      }
      chatSession.initiator = userObj;
      db.collection('users').find({ $or: chatSession.memberLists.map((member) => { return { _id: member } } )}).toArray(membersCallback);
    }

    function membersCallback( err, members) {
      if (err) {
        return callback(err);
      }
      chatSession.memberLists = members;
      db.collection('chatMessages').find({ $or: chatSession.chatMessages.map((message) => { return { _id: message } } )}).toArray(messagesCallback);
    }

    function messagesCallback( err, messages) {
      if (err) {
        return callback(err);
      }
      chatSession.chatMessages = messages;
      resolveChatMessages(chatSession.chatMessages, function( err, chatMessages) {
        if (err) {
          return callback(err);
        }
        chatSession.chatMessages = chatMessages;
        callback(err, chatSession);
      });
    }
  }

  function resolveChatMessages(chatMessages, callback) {
    var resolved = [];
    function resolveOwner(i) {
      if (i === chatMessages.length) {
        return callback(null, resolved);
      }
      else {
        db.collection('users').findOne({ _id: chatMessages[i].owner }, function( err, owner) {
          if (err) {
            callback(err);
          }
          chatMessages[i].owner = owner;
          resolved.push(chatMessages[i]);
          resolveOwner(i + 1);
        });
      }
    }
    return resolveOwner(0);
  }

  app.delete('/chatsession/:chatid/memberlists/:userid', function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var chatId = req.params.chatid;
    var userId = req.params.userid;
    var authId = req.query.user;
    if (fromUser === authId) {
      deleteChatMember(new ObjectID(chatId), new ObjectID(userId), new ObjectID(fromUser), function(err, data) {
        if (err) {
          // A database error happened.
          // Internal Error: 500.
          return sendDatabaseError(err);
        } else if (data === null) {
          res.status(400).send("Could not delete add member chat session for user " + userId);
        } else {
          // Send data.
          res.send(data);
        }
      });
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });

  function addChatMember(chatSessionId, userId, authId, callback) {
    var updateAction = {
      $addToSet: {
        memberLists: userId
      }
    };
    db.collection('chatSessions').findAndModify({ _id: chatSessionId, initiator: authId }, [], updateAction, { "new": true }, chatSessionCallback);

    function chatSessionCallback(err, chatSession) {
      if (err) {
        return callback(err);
      }
      resolveChatSession(chatSession.value, callback);
    }
  }

  app.put('/chatsession/:chatid/memberlists/:userid', function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var chatId = req.params.chatid;
    var userId = req.params.userid;
    var authId = req.query.user;
    if (fromUser === authId) {
      addChatMember(new ObjectID(chatId), new ObjectID(userId), new ObjectID(fromUser), function(err, data) {
        if (err) {
          // A database error happened.
          // Internal Error: 500.
          return sendDatabaseError(err);
        } else if (data === null) {
          res.status(400).send("Could not add member to chat session for user " + userId);
        } else {
          // Send data.
          res.send(data);
        }
      });
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });

  function deleteNotification(notificationId, callback) {
    db.collection('notifications').findAndModify({ _id: notificationId }, [], {}, { remove: true }, notificationCallback);
    function notificationCallback(err, notificationObj) {
      if (err) {
        return callback(err);
      }
      notificationObj = notificationObj.value;
      db.collection('users').findOne({ _id: notificationObj.requester }, userCallback);
      function userCallback(err, userObj) {
        if (err) {
          return callback(err);
        }
        notificationObj.requester = userObj;
        db.collection('chatSessions').findOne({ _id: notificationObj.chatSession }, chatSessionCallback);
        function chatSessionCallback(err, chatSessionObj) {
          if (err) {
            return callback(err);
          }
          notificationObj.chatSession = chatSessionObj;
          return callback(err, notificationObj);
        }
      }
    }
  }

  app.delete('/notification/:notificationid', function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var notificationId = req.params.notificationid;
    var authId = req.query.user;
    if (fromUser === authId) {
      deleteNotification(new ObjectID(notificationId), function(err, data) {
        if (err) {
          // A database error happened.
          // Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (data === null) {
          res.status(400).send("Could not delete notification");
        } else {
          // Send data.
          res.send(data);
        }
      });
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });

  function updateNotificationStatus(notificationId, status, callback) {
    var updateAction = {
      $set: {
        status: status
      }
    };
    db.collection('notifications').findAndModify({ _id: notificationId}, [], updateAction, {"new": true}, notificationCallback);
    function notificationCallback(err, notificationObj) {
      if (err) {
        return callback(err);
      }
      notificationObj = notificationObj.value;
      db.collection('users').findOne({ _id: notificationObj.requester }, userCallback);
      function userCallback(err, userObj) {
        if (err) {
          return callback(err);
        }
        notificationObj.requester = userObj;
        db.collection('chatSessions').findOne({ _id: notificationObj.chatSession }, chatSessionCallback);
        function chatSessionCallback(err, chatSessionObj) {
          if (err) {
            return callback(err);
          }
          notificationObj.chatSession = chatSessionObj;
          return callback(err, notificationObj);
        }
      }
    }
  }

  app.put('/notification/:notificationid/status/:status', function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var notificationId = req.params.notificationid;
    var status = req.params.userid;
    var authId = req.query.user;
    if (fromUser === authId) {
      updateNotificationStatus(new ObjectID(notificationId), body.status, function(err, data) {
        if (err) {
          // A database error happened.
          // Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (data === null) {
          res.status(400).send("Could not update notification status");
        } else {
          // Send data.
          res.send(data);
        }
      });
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });

  function postChatMessage(value, chatSessionId, userId, callback) {
    var chatMessage = {
      "content": value,
      "owner": userId,
      "chatSessionId": chatSessionId
    };
    db.collection('chatMessages').insertOne(chatMessage, chatMessageCallback);
    function chatMessageCallback(err, chatMessageObj) {
      if (err) {
        return callback(err);
      }
      db.collection('chatSession').updateOne({ _id: chatSessionId }, {
        $push: {
          chatMessages: chatMessageObj._id
        }
      }, chatSessionCallback);
      function chatSessionCallback(err) {
        if (err) {
          return callback(err);
        }
        db.collection('users').findOne({ _id: userId }, userCallback);
        function userCallback(err, userObj) {
          if (err) {
            return callback(err);
          }
          chatMessageObj.owner = userObj;
          return callback(err, chatMessageObj);
        }
      }
    }
  }

  app.post('/chatmessage', validate({ body: ChatMessageSchema }), function(req, res) {
    // If this function runs, `req.body` passed JSON validation!
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = body.owner;
    var chatId = body.chatSessionId;
    // Check if requester is authorized to post this status update.
    // (The requester must be the author of the update.)
    if (fromUser === userId) {
      postChatMessage(body.content, new ObjectID(chatId), new ObjectID(userId), function(err, data) {
        if (err) {
          // A database error happened.
          // Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (data === null) {
          res.status(400).send("Could not post chat message");
        } else {
          // Send data.
          res.send(data);
        }
      });
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });

  function getChatSessions(sessionId, callback) {
    db.collection('chatSessions').findOne({ _id: sessionId }, function(err, chatSessionObj) {
      if (err) {
        return callback(err);
      }
      return resolveChatSession(chatSessionObj, callback);
    });
  }

  app.get('/chatsession/:chatid', function(req, res) {
    var chatId = req.params.chatid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = req.query.user;
    if (fromUser === userId) {
      // Send response.
      getChatSessions(new ObjectID(chatId), function(err, data) {
        if (err) {
          // A database error happened.
          // Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (data === null) {
          res.status(400).send("Could not get chat session");
        } else {
          // Send data.
          res.send(data);
        }
      });
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });

  function postNotifications(requester, requestee, callback) {
    db.collection('chatSessions').findOne({ initiator: requester }, chatSessionCallback);
    function chatSessionCallback(err, chatSessionObj) {
      var newNoti = {
        requester: requester,
        requestee: requestee,
        chatSession: chatSessionObj._id,
        status: "waiting"
      }
      db.collection('notifications').insertOne(newNoti, notificationCallback);
      function notificationCallback(err, notificationObj) {
        if (err) {
          return callback(err);
        }
        db.collection('users').findOne({ _id: notificationObj.requester }, userCallback);
        function userCallback(err, userObj) {
          if (err) {
            return callback(err);
          }
          notificationObj.requester = userObj;
          notificationObj.chatSession = chatSessionObj;
          return callback(err, notificationObj);
        }
      }
    }
  }

  app.post('/notification', validate({ body: NotificationSchema }), function(req, res) {
    // If this function runs, `req.body` passed JSON validation!
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var requesterId = body.requester;
    var requesteeId = body.requestee;
    if (fromUser === requesterId) {
      postNotifications(new ObjectID(requesterId), new ObjectID(requesteeId), function(err, data) {
        if (err) {
          // A database error happened.
          // Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (data === null) {
          res.status(400).send("Could not post notifications");
        } else {
          // Send data.
          res.send(data);
        }
      });
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

  function getOnlineUsers(callback) {
    db.collection('onlineUsers').findOne({ _id: new ObjectID('000000000000000000000001') }, onlineUsersCallback);
    function onlineUsersCallback(err, onlineUsersObj) {
      var resolved = [];
      function resolveUser(i) {
        if (i === resolved.length) {
          return callback(null, resolved);
        }
        db.collection('users').findOne({ _id: onlineUsersObj[i]}, userCallback);
        function userCallback(err, userObj) {
          if (err) {
            return callback(err);
          }
          resolved.push(userObj);
          resolveUser(i + 1);
        }
      }
      return resolveUser(0);
    }
  }

  app.get('/onlineusers', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = req.query.user;
    if (fromUser === userId) {
      // Send response.
      getOnlineUsers(function(err, data) {
        if (err) {
          // A database error happened.
          // Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (data === null) {
          res.status(400).send("Could not get online users");
        } else {
          // Send data.
          res.send(data);
        }
      });
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });

  function getNearbyUsers(radius, userId, callback) {
    getOnlineUsers(onlineUsersCallback);
    function onlineUsersCallback(err, onlineUsersObj) {
      if (err) {
        return callback(err);
      }
      var currentUser = _.remove(onlineUsersObj, function(val) {
        return val._id === userId;
      });
      var nearbyUsers = [];
      for(var i = 0; i < onlineUsersObj.length; i++) {
        var curLatLng = {
          latitude: currentUser.position.lat,
          longitude: currentUser.position.lng,
        };
        var otherLatLng = {
          latitude: onlineUsersObj[i].position.lat,
          longitude: onlineUsersObj[i].position.lng,
        };
        var distance = geolib.getDistance(curLatLng, otherLatLng);
        if (distance <= radius) {
          nearbyUsers.push(onlineUsersObj[i]);
        }
      }
      callback(err, nearbyUsers);
    }
  }

  app.get('/user/:userid/nearby', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = req.params.userid;
    var radius = req.query.radius;
    if (!_.isNumber(radius) || _.isNaN(radius)) {
      radius = 10000; // default radius
    }
    if (fromUser === userId) {
      // Send response.
      getNearbyUsers(radius, new ObjectID(userId), function(err, data) {
        if (err) {
          // A database error happened.
          // Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (data === null) {
          res.status(400).send("Could not get nearby users");
        } else {
          // Send data.
          res.send(data);
        }
      });
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });

  function getNotifications(userId, callback) {
    db.collection('notifications').find({ requestee: userId}).toArray(notificationsCallback);
    function notificationsCallback(err, notificationsObj) {
      var resolved = [];
      var noti = {};
      function resolveRequester(i) {
        if (i === resolved.length) {
          return callback(err, resolved);
        }
        noti = notificationsObj[i];
        db.collection('users').findOne({ _id: noti.requester }, userCallback);
        function userCallback(err, userObj) {
          if (err) {
            return callback(err);
          }
          noti.requester = userObj;
          resolveChatSession(i);
        }
      }
      function resolveChatSession(i) {
        db.collection('chatSessions').findOne({ _id: noti.chatSession }, chatSessionCallback);
        function chatSessionCallback(err, chatSession) {
          if (err) {
            return callback(err);
          }
          noti.chatSession = chatSession;
          resolved.push(noti);
          resolveRequester(i + 1);
        }
      }
      return resolveRequester(0);
    }
  };

  app.get('/user/:userid/notification', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = req.params.userid;
    if (fromUser === userId) {
      // Send response.
      getNotifications(new ObjectID(userId), function(err, data) {
        if (err) {
          // A database error happened.
          // Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (data === null) {
          res.status(400).send("Could not get notifications");
        } else {
          // Send data.
          res.send(data);
        }
      });
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });
  /**
   * HONORS FEATURES
   */

  // Starts the server on port 3000!
  app.listen(3000, function () {
    console.log('Prepper listening on port 3000!');
  });
});
