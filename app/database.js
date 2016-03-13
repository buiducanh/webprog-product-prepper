import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "Prepper";

// Put your mock objects here, as in Workshop 4
var initialData = {
  // The "user" collection. Contains all of the users in our Prepper system.
  "users": {
    // This user has id "1".
    "1": {
      "_id": 1,
      "email": "someone@gmail.com",
      "fullName": "Someone",
      "interview": [1],
      "languages": ["Java", "Python"],
      "experience": 2,
      "cover": "http://www.f-covers.com/cover/geek-typography-code-css-command-facebook-cover-timeline-banner-for-fb.jpg",
      "avatar": "http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-ponsy-deer.png",
      "location": "New York, NY"
    },
    "2": {
      "_id": 2,
      "email": "else@gmail.com",
      "fullName": "Someone Else",
      "interview": [2],
      "languages": ["Java"],
      "experience": 1,
      "cover": "http://facecoverz.com/static/img/uploads/o_facecoverz.com-1317912175824.png",
      "avatar": "http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-cupcake-guy.png",
      "location": "Boston, MA"
    },
    "3": {
      "_id": 3,
      "email": "another@gmail.com",
      "fullName": "Another Person",
      "interview": [],
      "languages": ["Java", "C"],
      "experience": 2,
      "cover": "http://www.pickycovers.com/uploads/cover/f217c2b1ab2ff9369fd7fad92185fae3.jpg",
      "avatar": "http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-short-hair-girl.png",
      "location": "San Francisco, CA"

    },
    // This is "you"!
    "4": {
      "_id": 4,
      "email": "pepperasalt@gmail.com",
      "fullName": "Pepper & Salt",
      "interview": [1,2],
      "languages": ["Java"],
      "experience": 2,
      "cover": "http://cdn-img.fimfiction.net/story/8fas-1432553431-172259-full",
      "avatar": "http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-tech-guy.png",
      "location": "Amherst, MA"
    }
  },
  // all the interview sessions
  "interviewSessions": {
    "1": {
      "_id": 1,
      "problem": 1,
      "feedback": 1,
      "interviewer": 1,
      "interviewee": 4,
      "timestamp": 1453668480000,
      "duration": "45 minutes",
      "code" : "def ...",
      "result": "Successful"
    },
    "2": {
      "_id": 2,
      "problem": 2,
      "feedback": 2,
      "interviewer": 2,
      "interviewee": 4,
      "timestamp": 1453668880000,
      "duration": "45 minutes",
      "code" : "def ...",
      "result": "Successful"
    }
  },
  "feedbacks": {
    "1": {
      "_id": 1,
      "interviewer": 1,
      "interviewee": 4,
      "interviewer_pro": "confident",
      "interviewer_con": "not familiar with the interviewer questions",
      "interviewer_comment": "you did well",
      "interviewer_rating": 4,
      "interviewee_pro": "smart",
      "interviewee_con": "nervous during the interview",
      "interviewee_comment": "you did great",
      "interviewee_rating": 5,
      "interview_session": 1,
      "timestamp": 1453668480000
    },
    "2": {
      "_id": 2,
      "interviewer": 2,
      "interviewee": 4,
      "interviewer_pro": "good problem solving skill",
      "interviewer_con": "not very confident",
      "interviewer_comment": "Okay",
      "interviewer_rating": 6,
      "interviewee_pro": "helpful",
      "interviewee_con": "doesn't explain the problem very well",
      "interviewee_comment": "you did great",
      "interviewee_rating": 7,
      "interview_session": 2,
      "timestamp": 1453668880000
    }
  },
  "problems": {
    "1": {
      "_id": 1,
      "title": "simple binary tree",
      "question": "print a binary tree inorder",
      "answer": "def .....",
      "difficulty": "Easy"
    },
    "2": {
      "_id": 2,
      "title": "bit manipulation",
      "question": "get the bits from position x to position y",
      "answer": "def .....",
      "difficulty": "Easy"
    }
  }
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  if (collection === undefined || collection == null) {
    data[collectionName] = {};
  }
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

export function readAllCollection(collectionName) {
  var collection = data[collectionName];
  var length = Object.keys(collection).length;
  var userData = [];
  for(var i = 1; i <= length; i++) {
    userData.push(readDocument(collectionName, i));
  }
  return userData;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
export class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="navbar-btn btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}
