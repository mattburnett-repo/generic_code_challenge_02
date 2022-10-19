
var express = require('express');
var server = express();

// get everything the server needs in order to run.
const loaders = require('./loaders/');
loaders(server);

module.exports = server;