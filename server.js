// import express and mongoose for server connection
const express = require('express');
const mongoose = require('mongoose');

// create a variable to access the server
const app = express();
const PORT = process.env.PORT || 3001;

// set up middleware for the server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// require the routes to use for the database
app.use(require('./routes'));

// connect to the mongoose database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-thoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries
mongoose.set('debug', true);

// activate the server
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));