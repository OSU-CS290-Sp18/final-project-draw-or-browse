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

// use photoData.json as a template
var drawingData = require('./photoData');

//setting up handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Public view
app.use(express.static('public'));

/*
// Load up Index Page
app.get('/', function (req, res, next) {
  res.status(200).render('index');
  console.log("==Index Page Handlebar loaded.");
  console.log("==Status Code: " + res.statusCode);
});
*/

// Load up Draw Page
app.get('/draw', function (req, res, next) {
  res.status(200).render('draw');
  console.log("==Draw Page Handlebar loaded.");
  console.log("==Status Code: " + res.statusCode);
});

// Load up Browse Page
app.get('/browse', function (req, res, next) {
  res.status(200).render('browse', {
    pictureObjects: drawingData
  });
  console.log("==Browse Page Handlebar loaded.")
  console.log("==Status Code: " + res.statusCode);
});

// For every other page, 404
app.get('*', function (req, res, next) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404');
//    console.log("==404: Page not found.")
//    console.log("==Status Code: " + res.statusCode);
    return;
  }
   // default to plain-text. send()
  res.type('txt').send('404: Page Not found');
});


/////////////////////////////
// Testing the Browse Page //
/////////////////////////////
app.get('/test', function (req, res, next) {
  res.render('browse', {
    pictureObjects: [
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
