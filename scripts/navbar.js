var fs = require('fs');
var pathToWrite = __dirname + "/../" + process.argv[2];
var pathToRead = __dirname + "/../build/base.html";
var file = fs.readFileSync(pathToRead, "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
});
var navRe = /(<nav)((.|\n(?!<\/nav>))*?)(<\/nav>)/
var matched = navRe.exec(file)[0]
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
