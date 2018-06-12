/* Filename: Index.js 
   description: It serves.
*/

var debug = 1;
var path = require("path");
var fs = require("fs");
const http = require("http");
var express = require("express");
var checkMimeType = true;

const app = express();

function requestHandler(req, res){
  
// Default view = index.html
  if (req.url === '/'){
    var filename = "/index.html";
  } else {
    var filename = req.url || "index.html";
  }
  var ext = path.extname(filename);
  var localPath = __dirname;
  var validExtentions = {
    ".html" : "text/html",
    ".htm" : "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".txt": "text/plain",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".png": "image/png",
  };
  
  var validMimeType = true;
  var mimeType = validExtentions[ext];
  if (checkMimeType){
    validMimeType = validExtentions[ext] != undefined;
  }
  
  if (validMimeType) {
    localFile = localPath +filename;
    fs.exists(localFile, function(exists) {
      if (exists) {
        console.log("File Downloaded:" + localFile);
        res.statusCode = 200;
      } else {
        console.log("File not found:" + localFile);
        //res.writeHead(404);
        res.statusCode = 404;
        filename = "/redir/404.html";
        localFile = localPath +filename;
      } 
      getFile(localFile, res, mimeType);
    });
  }
  
  if (debug) {
    console.log("----------------------");
    console.log("Debug Enabled...");
    console.log("Method: ", req.method);
    console.log("URL: ", req.url);
    console.log("Status Code: ", res.statusCode);
  }
}
function getFile(localPath, res, mimeType) {
  fs.readFile(localPath, function(err, contents) {
    if(!err) {
      res.setHeader("Content-Length", contents.length);
      if (mimeType != undefined) {
        res.setHeader("Content-Type", mimeType);
      }
      res.statusCode = 200;
      res.end(contents);
    } else {
      res.writeHead(500);
      res.end();
    }
  });
}

var server = http.createServer(requestHandler);
var PORT = 8080;

server.listen(PORT, function () {
  console.log("Server running on port "+PORT+"...");
});