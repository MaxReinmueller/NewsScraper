var express = require("express");
var mongoose = require("mongoose");


var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
