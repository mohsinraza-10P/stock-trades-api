const express = require("express");
const route = require("./routes/trades");

// Create express application
const app = express();

// Parse incoming JSON to an object
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(route);

module.exports = app;
