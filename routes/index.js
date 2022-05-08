//Setting constants for express and router
const express = require('express');
const notesRtr = require('./notes');
const app = express();
//Imports modular route for notes html
app.use('/notes', notesRtr);

module.exports = app;