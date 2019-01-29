const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

// Set up the express app
const app = express();

// app.use(express.static(path.join(__dirname + '/dist')));

//Set up CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

// Log requests to the console.
app.use(logger('dev'));
app.use(cookieParser())

// Parse incoming requests data (https://github.com/expressjs/body-parser)a
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes/index')(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.all('*', (req, res) => res.status(404).send({
  message: 'Not Found.',
  info: "This page does not exist."
}));


module.exports = app;