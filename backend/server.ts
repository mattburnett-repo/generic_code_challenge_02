
var express = require('express');
var server = express();

const loaders = require('./loaders/');
loaders(server);

module.exports = server;