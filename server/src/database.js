// Your startup's initial mock objects go here
var initialData = {
  "onlineUsers": {
    "1": [1, 4]
  },
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
      "location": "New York, NY",
      position: {
        lat: 42.373864,
        lng: -72.515388
      }
    },
    "2": {
      "_id": 2,
      "email": "else@gmail.com",
      "fullName": "Mike",
      "interview": [2],
      "languages": ["Java"],
      "experience": 1,
      "cover": "http://facecoverz.com/static/img/uploads/o_facecoverz.com-1317912175824.png",
      "avatar": "http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-cupcake-guy.png",
      "location": "Boston, MA",
      position: { lat: 42.373468, lng: -72.524271 }
    },
    "3": {
      "_id": 3,
      "email": "another@gmail.com",
      "fullName": "Alex",
      "interview": [],
      "languages": ["Java", "C"],
      "experience": 2,
      "cover": "http://www.pickycovers.com/uploads/cover/f217c2b1ab2ff9369fd7fad92185fae3.jpg",
      "avatar": "http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-short-hair-girl.png",
      "location": "San Francisco, CA",
      position: { lat: 12.373468, lng: -72.524271 }
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
      "location": "Amherst, MA",
      position: { lat: 42.371344, lng: -72.520924 }
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
      "answer": "List<Integer> list =new ArrayList();\n    Stack<TreeNode> stack=new Stack();\n    if(root==null) return list;\n    while(root!=null){\n        stack.push(root);\n        root=root.left;\n        while(root==null){\n            if(stack.empty()) return list;\n            root=stack.pop();\n            list.add(root.val);\n            root=root.right;\n        }\n    }\n    return list;",
      "difficulty": "Medium"
    },
    "2": {
      "_id": 2,
      "title": "calculator",
      "question": "Implement a basic calculator to evaluate a simple expression string.",
      "answer": "public int calculate(String s) {\n    Stack<Integer> stackInt = new Stack<>(), stackSign = new Stack<>();\n    int result = 0, sign = 1, num = 0;\n    for(int i=0; i<s.length(); i++) {\n        char c = s.charAt(i);\n        if(c >= \'0\' && c <= \'9\') {\n            int digit = Character.getNumericValue(c);\n            if((Integer.MAX_VALUE-digit)\/10<num) num = Integer.MAX_VALUE;\n            else num = 10 * num + digit;\n        } else if(c == \'+\' || c == \'-\') {\n            result += num * sign;\n            num = 0;\n            sign = c == \'+\' ? 1 : -1;\n        } else if(c == \'(\') {\n            stackInt.push(result);\n            stackSign.push(sign);\n            result = 0;\n            sign = 1;\n        } else if(c == \')\') {\n            result += num * sign;\n            result = result * stackSign.pop() + stackInt.pop();\n            num = 0;\n            sign = 1;\n        }\n    }\n    result += num * sign;\n    return result; }",
      "difficulty": "Hard"
    },
    "3": {
      "_id": 3,
      "title": "counting bits",
      "question": "Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.",
      "answer": "class Solution {\npublic:\n    vector<int> countBits(int num) {\n         vector<int>result;result.push_back(0);\n         for (int i=1; i<=num; i++) result.push_back(1+result[(i-1)&i])；\n         return result;\n    }\n}",
      "difficulty": "Easy"
    },
    "4": {
      "_id": 4,
      "title": "compare version numbers",
      "question": "Compare two version numbers version1 and version2. If version1 > version2 return 1, if version1 < version2 return -1, otherwise return 0.",
      "answer": "class Solution(object):\n  def compareVersion(self, version1, version2):\n    \"\"\"\n    :type version1: str\n    :type version2: str\n    :rtype: int\n    \"\"\"\n    v1 = version1.split(\'.\')\n    v2 = version2.split(\'.\')\n    l1, l2 = len(v1), len(v2)\n    for i in xrange(max(l1, l2)):\n        ver1 = int(v1[i]) if i < len(v1) else 0\n        ver2 = int(v2[i]) if i < len(v2) else 0\n        if ver1 > ver2:\n            return 1\n        elif ver1 < ver2:\n            return -1\n    return 0",
      "difficulty": "Easy"
    }
  },
  "notifications": {
    "1": {
      "_id": 1,
      "requester": 2,
      "requestee": 4,
      "status": "waiting",
      "chatSession": 2
    },
    "2": {
      "_id": 2,
      "requester": 1,
      "requestee": 4,
      "status": "waiting",
      "chatSession": 3
    }
  },
  "chatSessions": {
    "1": {
      "_id": 1,
      "active": true,
      "initiator": 4,
      "memberLists": [1, 3, 4],
      "chatMessages": [1]
    },
    "2": {
      "_id": 2,
      "active": true,
      "initiator": 2,
      "memberLists": [2],
      "chatMessages": []
    },
    "3": {
      "_id": 3,
      "active": true,
      "initiator": 1,
      "memberLists": [1],
      "chatMessages": []
    }
  },
  "chatMessages": {
    "1": {
      "_id": 1,
      "content" : "Hello",
      "owner" : 1,
      "chatSessionId": 1
    }
  }
};



var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
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
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function readAllCollection(collectionName) {
  var collection = data[collectionName];
  var length = Object.keys(collection).length;
  var userData = [];
  for(var i = 1; i <= length; i++) {
    userData.push(readDocument(collectionName, i));
  }
  return userData;
}
module.exports.readAllCollection = readAllCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
  var firepadRef = new Firebase('https://brilliant-torch-7009.firebaseio.com/');
  //clean database for the code editor
  firepadRef.remove();
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
