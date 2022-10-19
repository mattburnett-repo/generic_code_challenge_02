
//  a minimal Express server configuration

var express = require('express');
var path = require('path');

var cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = (app: any) => {
  let corsOptions = {
    origin: process.env.CLIENT_URL
  }
  app.use(cors(corsOptions))

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  return app;
}