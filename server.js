// require dependencies
var express = require('express');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

// set up port
var PORT = process.env.PORT || 3002;

// initiate express
var app = express();

// set up express router
var router = express.Router();

// require the routes file
require("./config/routes")(router);

// set up the static directory
app.use(express.static(__dirname + "/public"));

// connect handlebars to express app
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// use bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));

// make requests go through middleware
app.use(router);

// Use the database and store it in a variable
var db = process.env.MONGODB_URI || "mongodb://localhost/newsScraperNews"

// connect mongoose to the database
mongoose.connect(db, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("mongoose connection successful");
    }
})

// turn on server
app.listen(PORT, function () {
    console.log("listening on port: " + PORT);
});