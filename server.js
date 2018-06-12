/* Filename: Server.js 
   description: It serves.

*/

var path = require("path");
var fs = require("fs");
var http = require("http");
var express = require("express");
var exp_handlebars = require("express-handlebars");
var bodyParser = require("body-parser");

var pictures = require("./photo-init");

var app = express();
app.engine("handlebars", exp_handlebars({defaultlayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.json());

console.log("Starting express server...");

app.get("/", function(req, res, err) {
    var args = {
        picture: pictures
    };
});

app.get("/pictures", function(req, res, err){
    var args = {
        picture: pictures
    };
});

app.post("/pictures/addPicture", function(req, res, err){
    console.log("Adding Picture...");
    var newPicture = {
        title: req.body.title,
        author: req.body.author,
        password: req.body.password,
//        tags: req.body.tags
    };
    pictures[newPicture.title] = newPicture;
    console.log("Title: ", req.body.title);
    
    fs.writeFile("pictures.json", JSON.stringify(pictures), function(err) {
        if (err) {
            req.status(500).send("Unable to save new picture.");
        } else {
            res.status(200).send("Picture saved!");
        }
    });
});

//app.use(express.static("/"));
// Default view = index.html
app.use (function(req, res) {
  res.send("index.html");
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(8080, () => console.log("Server running on port 8080..."))
