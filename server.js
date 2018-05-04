'use strict';

const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const routes = require("./app/routes");

// app.set('models', require("./app/models"));

// handles all the requested files needed to send to the browser: index.html, css, and JS files.
app.use(express.static(__dirname + "/public"));
app.use("/angular", express.static(__dirname + "/node_modules/angular/"));
app.use("/angular-route", express.static(__dirname + "/node_modules/angular-route/"));

// session persistence
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
); 

require("./app/config/passport-strat.js");
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(8080, () => {
  console.log('Listening on port 8080'); 
});