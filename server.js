/* Filename: server.js
   description: It serves you right.
   */

var debug = 1; //Enable to see status code
var path = require("path");
var fs = require("fs");
const http = require("http");
var express = require("express");
var exphbs = require("express-handlebars");
var checkMimeType = true;
var drawingData = require("./photo-init");

var MongoClient = require('mongodb').MongoClient;
var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DBNAME;

var mongoURL =
'mongodb://' + mongoUser + ':' + mongoPassword + '@' +
mongoHost + ':' + mongoPort + '/' + mongoDBName;

var mongoDBDatabase;

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', function (req, res) {
   res.status(200).render('partials/indexPage');
   /*res.status(200).render('browsePage', {
     data: drawingData}); */
});

app.get('/browse.html', function (req, res) {
   res.status(200).render('browsePage', {
     data: drawingData});
});

app.get('/draw.html', function (req, res) {
   res.status(200).render('drawPage');
});

/*
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
	/////////////
	////DEBUG////
	/////////////
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

var server = http.createServer(requestHandler); */
var PORT = 9154;

app.get('*', function (req, res) {
   res.status(404);
   res.send("The page you requested doesn't exist");
});
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//Mongo Stuff 

MongoClient.connect(mongoURL, function (err, client) {
   if (err) {
      throw err;
   }
   db = mongoDBDatabase = client.db(mongoDBName);

   // Starting Server
   app.listen(PORT, function () {
      console.log("Server running on port "+PORT+"...");
   });
});

