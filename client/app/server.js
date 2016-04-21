import _ from "lodash";

var token = 'eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNCJ9'; // <-- Put your base64'd JSON token here
var authObj = {
  author: localStorage.getItem('userId')
};

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
export function getInterviewData(user, cb) {
  // We don't need to send a body, so pass in 'undefined' for the body.
  sendXHR('GET', '/user/'+user+'/interviews', undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

export function getInterviewSession(interviewId, cb) {
  sendXHR('GET', '/interview/'+ interviewId + '?user=' + localStorage.getItem('userId'), undefined, (xhr) => {
    // Call the callback with the data.
     cb(JSON.parse(xhr.responseText));
   });
}

export function getUserData (user, cb) {
  sendXHR('GET', '/user/' + user, undefined, (xhr) => {
    // Call the callback with the data.
     cb(JSON.parse(xhr.responseText));
   });
}

export function getAllUserData (cb) {
  sendXHR('GET', '/user', undefined, (xhr) => {
    // Call the callback with the data.
     cb(JSON.parse(xhr.responseText));
   });
}

export function postFeedbackData(feedbackData, cb) {
  // feedbackData.timestamp = new Date().getTime();
  // var newFeedback = addDocument("feedbacks", feedbackData);
  // return newFeedback;
  sendXHR('POST', '/feedback',
      feedbackData,
     (xhr) => {
      // Return the new status update.
      cb(JSON.parse(xhr.responseText));
    });
}


export function postInterviewSession(interviewerId, cb) {
  var interview =  {
    interviewer: interviewerId
  }
  var url = '/interview';
  sendXHR('POST', url, interview, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}


/**
 * Searches for feed items with the given text.
 */
export function searchForUsers(queryText, cb) {
  //userID is not needed; it's included in the JSON web token.
  sendXHR('POST', '/searchpeople?searchTerm=' + queryText, undefined, (xhr) => {
   cb(JSON.parse(xhr.responseText));
  });
}
export function endInterview(duration, code, interviewer_id, interviewee_id, interviewId, cb) {
  sendXHR('POST', '/endinterview', {
    "duration": duration,
    "code": code,
    "interviewer_id": interviewer_id,
    "interviewee_id" : interviewee_id,
    "interviewId" : interviewId
    },  (xhr) => {
    cb();
  });
}
/**
 * HONORS FEATURES
 */
export function deleteChatMember(chatSessionId, userId, cb) {
  var url = '/chatsession/' + chatSessionId + '/memberlists/' + userId + '?user=' + localStorage.getItem('userId');
  sendXHR('DELETE', url, {}, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function addChatMember(chatSessionId, userId, cb) {
  var url = '/chatsession/' + chatSessionId + '/memberlists/' + userId + '?user=' + localStorage.getItem('userId');
  sendXHR('PUT', url, {}, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function deleteNotification(notificationId, cb) {
  var url = '/notification/' + notificationId + '?user=' + localStorage.getItem('userId');
  sendXHR('DELETE', url, {}, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function updateNotificationStatus(notificationId, status, cb) {
  var url = '/notification/' + notificationId + '/status/' + status + '?user=' + localStorage.getItem('userId');
  sendXHR('PUT', url, {}, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function postChatMessage(value, chatSessionId, userId, cb) {
  var chatMessage = {
    "content": value ? value : "",
    "owner": parseInt(userId, 10),
    "chatSessionId": parseInt(chatSessionId, 10)
  };
  var url = '/chatmessage';
  sendXHR('POST', url, chatMessage, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getChatSessions(sessionId, cb) {
  var url = '/chatsession/' + sessionId + '?user=' + localStorage.getItem('userId');
  sendXHR('GET', url, {}, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

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

export function postNotifications(requester, requestee, cb) {
  var newNoti = {
    requester: requester,
    requestee: requestee,
  }
  var url = '/notification';
  sendXHR('POST', url, newNoti, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getOnlineUsers(cb) {
  var url = '/user/' + localStorage.getItem('userId') + '/online';
  sendXHR('GET', url, {}, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getNearbyUsers(radius, userId, cb) {
  var url = '/user/' + localStorage.getItem('userId') + '/nearby';
  sendXHR('GET', url, {}, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getNotifications(userId, cb) {
  var url = '/user/' + userId + '/notification';
  sendXHR('GET', url, {}, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * HONORS FEATURES
 */
