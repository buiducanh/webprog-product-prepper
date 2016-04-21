var ObjectID = require('mongodb').ObjectID;
function generateObjectID(number) {
  var result = number.toString();
  while (result.length < 24) {
    result = "0".concat(result);
  }
  return new ObjectID(result);
}

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = "prepper";
// Put the initial mock objects here.
var initialData = {
  "onlineUsers": {
    "1": [generateObjectID(1), generateObjectID(4)]
  },
  // The "user" collection. Contains all of the users in our Prepper system.
  "users": {
    // This user has id "1".
    "1": {
      "_id": generateObjectID(1),
      "email": "someone@gmail.com",
      "fullName": "Someone",
      "interview": [generateObjectID(1)],
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
      "_id": generateObjectID(2),
      "email": "else@gmail.com",
      "fullName": "Mike",
      "interview": [generateObjectID(2)],
      "languages": ["Java"],
      "experience": 1,
      "cover": "http://facecoverz.com/static/img/uploads/o_facecoverz.com-1317912175824.png",
      "avatar": "http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-cupcake-guy.png",
      "location": "Boston, MA",
      position: { lat: 42.373468, lng: -72.524271 }
    },
    "3": {
      "_id": generateObjectID(3),
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
      "_id": generateObjectID(4),
      "email": "pepperasalt@gmail.com",
      "fullName": "Pepper & Salt",
      "interview": [generateObjectID(1),generateObjectID(2)],
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
      "_id": generateObjectID(1),
      "problem": generateObjectID(1),
      "feedback": generateObjectID(1),
      "interviewer": generateObjectID(1),
      "interviewee": generateObjectID(4),
      "timestamp": 1453668480000,
      "duration": 2700,
      "code" : "def ...",
      "result": "Successful"
    },
    "2": {
      "_id": generateObjectID(2),
      "problem": generateObjectID(2),
      "feedback": generateObjectID(2),
      "interviewer": generateObjectID(2),
      "interviewee": generateObjectID(4),
      "timestamp": 1453668880000,
      "duration": 2700,
      "code" : "def ...",
      "result": "Successful"
    }
  },
  "feedbacks": {
    "1": {
      "_id": generateObjectID(1),
      "interviewer": generateObjectID(1),
      "interviewee": generateObjectID(4),
      "interviewer_pro": "confident",
      "interviewer_con": "not familiar with the interviewer questions",
      "interviewer_comment": "you did well",
      "interviewer_rating": 4,
      "interviewee_pro": "smart",
      "interviewee_con": "nervous during the interview",
      "interviewee_comment": "you did great",
      "interviewee_rating": 5,
      "interview_session": generateObjectID(1),
      "timestamp": 1453668480000
    },
    "2": {
      "_id": generateObjectID(2),
      "interviewer": generateObjectID(2),
      "interviewee": generateObjectID(4),
      "interviewer_pro": "good problem solving skill",
      "interviewer_con": "not very confident",
      "interviewer_comment": "Okay",
      "interviewer_rating": 6,
      "interviewee_pro": "helpful",
      "interviewee_con": "doesn't explain the problem very well",
      "interviewee_comment": "you did great",
      "interviewee_rating": 7,
      "interview_session": generateObjectID(2),
      "timestamp": 1453668880000
    }
  },
  "problems": {
    "1": {
      "_id": generateObjectID(1),
      "title": "simple binary tree",
      "question": "print a binary tree inorder",
      "answer": "List<Integer> list =new ArrayList();\n    Stack<TreeNode> stack=new Stack();\n    if(root==null) return list;\n    while(root!=null){\n        stack.push(root);\n        root=root.left;\n        while(root==null){\n            if(stack.empty()) return list;\n            root=stack.pop();\n            list.add(root.val);\n            root=root.right;\n        }\n    }\n    return list;",
      "difficulty": "Medium"
    },
    "2": {
      "_id": generateObjectID(2),
      "title": "calculator",
      "question": "Implement a basic calculator to evaluate a simple expression string.",
      "answer": "public int calculate(String s) {\n    Stack<Integer> stackInt = new Stack<>(), stackSign = new Stack<>();\n    int result = 0, sign = 1, num = 0;\n    for(int i=0; i<s.length(); i++) {\n        char c = s.charAt(i);\n        if(c >= \'0\' && c <= \'9\') {\n            int digit = Character.getNumericValue(c);\n            if((Integer.MAX_VALUE-digit)\/10<num) num = Integer.MAX_VALUE;\n            else num = 10 * num + digit;\n        } else if(c == \'+\' || c == \'-\') {\n            result += num * sign;\n            num = 0;\n            sign = c == \'+\' ? 1 : -1;\n        } else if(c == \'(\') {\n            stackInt.push(result);\n            stackSign.push(sign);\n            result = 0;\n            sign = 1;\n        } else if(c == \')\') {\n            result += num * sign;\n            result = result * stackSign.pop() + stackInt.pop();\n            num = 0;\n            sign = 1;\n        }\n    }\n    result += num * sign;\n    return result; }",
      "difficulty": "Hard"
    },
    "3": {
      "_id": generateObjectID(3),
      "title": "counting bits",
      "question": "Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.",
      "answer": "class Solution {\npublic:\n    vector<int> countBits(int num) {\n         vector<int>result;result.push_back(0);\n         for (int i=1; i<=num; i++) result.push_back(1+result[(i-1)&i])；\n         return result;\n    }\n}",
      "difficulty": "Easy"
    },
    "4": {
      "_id": generateObjectID(4),
      "title": "compare version numbers",
      "question": "Compare two version numbers version1 and version2. If version1 > version2 return 1, if version1 < version2 return -1, otherwise return 0.",
      "answer": "class Solution(object):\n  def compareVersion(self, version1, version2):\n    \"\"\"\n    :type version1: str\n    :type version2: str\n    :rtype: int\n    \"\"\"\n    v1 = version1.split(\'.\')\n    v2 = version2.split(\'.\')\n    l1, l2 = len(v1), len(v2)\n    for i in xrange(max(l1, l2)):\n        ver1 = int(v1[i]) if i < len(v1) else 0\n        ver2 = int(v2[i]) if i < len(v2) else 0\n        if ver1 > ver2:\n            return 1\n        elif ver1 < ver2:\n            return -1\n    return 0",
      "difficulty": "Easy"
    }
  },
  "notifications": {
    "1": {
      "_id": generateObjectID(1),
      "requester": generateObjectID(2),
      "requestee": generateObjectID(4),
      "status": "waiting",
      "chatSession": generateObjectID(2)
    },
    "2": {
      "_id": generateObjectID(2),
      "requester": generateObjectID(1),
      "requestee": generateObjectID(4),
      "status": "waiting",
      "chatSession": generateObjectID(3)
    }
  },
  "chatSessions": {
    "1": {
      "_id": generateObjectID(1),
      "active": true,
      "initiator": generateObjectID(4),
      "memberLists": [generateObjectID(1), generateObjectID(3), generateObjectID(4)],
      "chatMessages": [generateObjectID(1)]
    },
    "2": {
      "_id": generateObjectID(2),
      "active": true,
      "initiator": generateObjectID(2),
      "memberLists": [generateObjectID(2)],
      "chatMessages": []
    },
    "3": {
      "_id": generateObjectID(3),
      "active": true,
      "initiator": generateObjectID(1),
      "memberLists": [generateObjectID(1)],
      "chatMessages": []
    }
  },
  "chatMessages": {
    "1": {
      "_id": generateObjectID(1),
      "content" : "Hello",
      "owner" : generateObjectID(1),
      "chatSessionId": generateObjectID(1)
    }
  }
};

/**
* Adds any desired indexes to the database.
*/
function addIndexes(db, cb) {
  db.collection('feedItems').createIndex({ "contents.contents": "text" }, null, cb);
}

/**
* Resets a collection.
*/
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
* Reset the MongoDB database.
* @param db The database connection.
*/
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      addIndexes(db, cb);
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
