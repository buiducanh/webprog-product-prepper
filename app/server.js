import {readDocument, writeDocument, addDocument, readAllCollection} from './database.js';
import _ from "lodash";

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
