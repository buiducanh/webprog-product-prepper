var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var pathToRead = path.join(__dirname, "/../build/base.html");
var file = fs.readFileSync(pathToRead, "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
});
var navRe = /(<nav)((.|\n(?!<\/nav>))*?)(<\/nav>)/
var matched = navRe.exec(file)[0]

var pathsToW = ['home.html', 'interview.html', 'user_profile.html', 'matching.html', 'feedback.html', 'history.html', 'meetup.html', 'meetup_chat.html']
function writeFile(value) {
  var pathToWrite = path.join(__dirname, "/../build/", value);
  var fileToWrite = fs.readFileSync(pathToWrite, "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
  });
  var newFile = fileToWrite.replace(navRe, matched);
  fs.writeFile(pathToWrite, newFile, function (err) {
      if (err) return console.log(err);
      else console.log("file Written");
  })
};
if (process.argv[2] === undefined) {
  _.each(pathsToW, writeFile)
}
else {
  writeFile(process.argv[2]);
}
