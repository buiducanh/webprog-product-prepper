// Implement your server in this file.
// We should be able to run your server with node src/server.js
// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
var bodyParser = require('body-parser');
var validate = require('express-jsonschema').validate;
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var readAllCollection = database.readAllCollection;

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

 app.post('/peopleprofile/:searchTerm', function(req, res) {
   console.log ("req");
   var queryText = req.params.searchTerm;
   var fromUser = getUserIdFromToken(req.get('Authorization'));
   var user = readDocument('users', fromUser);

   console.log ("type is: " );
   if (typeof(req.body) === 'string') {
     // trim() removes whitespace before and after the query.
     // toLowerCase() makes the query lowercase.
     queryText = queryText.trim().toLowerCase();
     var userData = readAllCollection('users');

     res.send(userData.filter((user) => {
       return user.fullName.toLowerCase().indexOf(queryText) !== -1;
     }));
   } else {
     // 400: Bad Request.
     res.status(400).end();
   }
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
