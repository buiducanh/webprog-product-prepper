import {readDocument, writeDocument, addDocument, readAllCollection} from './database.js';
import _ from "lodash";

var token = 'eyJpZCI6NH0='; // <-- Put your base64'd JSON token here
/**
 * Properly configure+send an XMLHttpRequest with error handling, authorization token,
 * and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global FacebookError */

  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      FacebookError('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    FacebookError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    FacebookError('Could not ' + verb + " " + resource + ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}


/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

/**
 * Given a feed item ID, returns a FeedItem object with references resolved.
 * Internal to the server, since it's synchronous.
 */
function getInterviewDataSync(interviewId) {
  var interviewItem = readDocument('interviewSessions', interviewId);
  // Resolve participants
  interviewItem.interviewer = readDocument('users', interviewItem.interviewer);
  interviewItem.interviewee = readDocument('users', interviewItem.interviewee);
  // Resolve feedback
  interviewItem.feedback = readDocument('feedbacks', interviewItem.feedback);
  // Resolve problem
  interviewItem.problem = readDocument('problems', interviewItem.problem);
  return interviewItem;
}

/**
 * Emulates a REST call to get the feed data for a particular user.
 * @param user The ID of the user whose feed we are requesting.
 * @param cb A Function object, which we will invoke when the Feed's data is available.
 */
export function getInterviewData(user, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  // Get the Feed object for the user.
  var interviewData = userData.interview.map(getInterviewDataSync);
  emulateServerReturn(interviewData, cb);
}

export function getUserData (user, cb) {
  var userData = readDocument('users', user);
  emulateServerReturn(userData, cb);
}

export function getAllUserData (cb) {
  var userData = readAllCollection('users');
  emulateServerReturn(userData, cb);
}

export function postFeedbackData(feedbackData, cb) {
  // dummy = {_id: 1, text: "dummy"}
  var newFeedback = addDocument("feedbacks", feedbackData);
  emulateServerReturn(newFeedback, cb);
}

export function postAnswers(feedbackData, cb) {
  // dummy = {_id: 1, text: "dummy"}
  var newFeedback = addDocument("feedbacks", feedbackData);
  emulateServerReturn(newFeedback, cb);
}

export function getNearbyUsers(radius, userId, cb) {
  var userData = readAllCollection('users');
  var currentUser = userData[userId - 1];
  userData.splice(userId - 1, 1);
  var nearbyUsers = [];
  for(var i = 0; i < userData.length; i++) {
    var curLatLng = new google.maps.LatLng(currentUser.position);
    var otherLatLng = new google.maps.LatLng(userData[i].position);
    var distance = google.maps.geometry.spherical.computeDistanceBetween(curLatLng, otherLatLng);
    if (distance <= radius) {
      nearbyUsers.push(userData[i]);
    }
  }
  emulateServerReturn(nearbyUsers, cb);
}

export function postNotifications(requester, requestee, cb) {
  var newNoti = {
    requester: requester,
    requestee: requestee
  }
  var notiData = addDocument("notifications", newNoti);
  emulateServerReturn(notiData, cb);
}

export function getNotifications(userId, cb) {
  var notifications = readAllCollection('notifications');
  notifications = _.filter(notifications, function(o) { return o.requestee == userId;});
  notifications = notifications.map((noti) => {
    noti.requester = readDocument("users", noti.requester);
    return noti;
  });
  emulateServerReturn(notifications, cb);
}

export function getOnlineUsers(cb) {
  var onlineUsers = readDocument('onlineUsers', 1);
  onlineUsers = onlineUsers.map((user) => {
    return readDocument("users", user);
  });
  emulateServerReturn(onlineUsers, cb);
}

export function getChatSessions(sessionId, cb) {
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
  emulateServerReturn(session, cb);
}

export function postInterviewSession(interviewerId, cb) {
  // Get the current UNIX time.
  var time = new Date().getTime();
  var intervieweeId = 2; // TODO random this number
  //TODO random role????
  var newIntvSession =
  {
    "problem": "",
    "feedback": undefined,
    "interviewer": interviewerId,
    "interviewee": intervieweeId,
    "timestamp": time,
    "duration": "",
    "code" : "",
    "result": "WIP"
  };
  newIntvSession = addDocument('interviewSessions', newIntvSession);
  emulateServerReturn(newIntvSession, cb);
}

export function postChatMessage(value, chatSessionId, userId, cb) {
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
  emulateServerReturn(chatMessage, cb);
}

/**
 * Searches for feed items with the given text.
 */
export function searchForUsers(queryText, cb) {
  // userID is not needed; it's included in the JSON web token.
  sendXHR('POST', '/peopleprofile/' + queryText, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });

}
