// require dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

// set up port
var PORT = process.env.PORT || 3000;

// initiate express
var app = express();

// set up express router
var router = express.Router();

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
}))

// make requests go through middleware
app.use(router);

// turn on server
app.listen(PORT, function () {
    console.log("listening on port: " + PORT);
});