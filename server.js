/* Filename: server.js
   description: It serves you right.
   */

var DEBUG = true; // Enable to see Status Code. 
var PORT = 9154;
var path = require("path");
var fs = require("fs");
const http = require("http");
var express = require("express");
var exphbs = require("express-handlebars");
var drawingData = require("./photo-init");

/////////////////
// Mongo Stuff //
/////////////////
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

var homePage = fs.readFileSync('public/index.html', 'utf8');
var drawPage = fs.readFileSync('public/draw.html', 'utf8');
var browsePage = fs.readFileSync('public/browse.html', 'utf8');

//setting up handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Public view
app.use(express.static('public'));

// Load up Index Page 
app.get('/', function (req, res, next) {
  res.status(200).render('index');
  console.log("==Index Page Handlebar loaded.");
});

// Load up Draw Page 
app.get('/draw.html', function (req, res, next) {
  res.status(200).render('draw');
  console.log("==Draw Page Handlebar loaded.");
});

// Load up Browse Page 
app.get('/browse.html', function (req, res, next) {
  res.status(200).render('browse', {
    pictureObjects : drawingData
  });
  console.log("==Browse Page Handlebar loaded.")
});

/////////////////////////////
// Testing the Browse Page //
/////////////////////////////
app.get('/test', function (req, res, next) {
  res.render('browse', {
    test: [ 
    {
      title: "Apple",
      author: "Apple Author",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Honeycrisp.jpg/1280px-Honeycrisp.jpg?1528813883629",
    }
  ]
  });
  console.log("==Testing partial Handlebar loaded.");
});

/////////////////////////
// Starting the Server //
/////////////////////////
app.listen(PORT, function(){
  console.log("==Server running on port "+PORT+"...");
});