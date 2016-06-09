require('use-strict');
const express = require('express');
const App = require('./app/router');

var app = express();

var server = app.listen(process.env.PORT, function () {
  new App();
});
