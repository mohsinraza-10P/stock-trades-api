const express = require('express');
const httpStatus = require('http-status');
const indexRoute = require('./routes/index');
const tradesRoute = require('./routes/trades');
const { errorHandler } = require('./middlewares/error');

// Create express application
const app = express();

// Parse incoming JSON to an object
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRoute);
app.use('/trades', tradesRoute);

// Handle unknown API request and forward to middleware
app.use((req, res, next) => {
  var err = new Error(httpStatus[httpStatus.NOT_FOUND]);
  err.statusCode = httpStatus.NOT_FOUND;
  next(err);
});

// Error middleware
app.use(errorHandler);

module.exports = app;
