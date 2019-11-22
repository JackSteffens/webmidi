'use strict';

// Dependencies
const express = require('express');
const session = require('express-session');
const sharedsession = require("express-socket.io-session");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');             // Console logging
const bodyParser = require('body-parser');    // Application headers
const http = require('http');
const passport = require('passport');
require('colors');

const config = require('./config.js');
const websocket = require('./server/utils/websocket.js'); // Global socket.io websocket
const router = require('./router.js');
const authentication = require('./server/services/authentication.service.js');

// Configuration
mongoose.connect(config.DATABASE,
  config.DATABASE_USERNAME ? {
    user: config.DATABASE_USERNAME,
    pass: config.DATABASE_PASSWORD,
    dbName: config.DATABASE_NAME
  } : {
    dbName: config.DATABASE_NAME
  })
  .catch((err) => {
    if (err) {
      console.log(('[!] Unable to connect to database.\n').red + (err).toString().yellow);
      return process.exit();
    }
  });
const app = express();
app.use(express.static(__dirname + '/public/dist'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Set authentication strategies
app.use(cookieParser('webmidi'));
app.use(session({
  secret: 'webmidi',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());
authentication.init();

// Set routing
router.setRequestUrl(app);

// Socket.io
const server = http.Server(app); // Server, required for socket.io
websocket.init(server, session, sharedsession);

// Start server
server.listen(config.SERVER_PORT, config.SERVER_IP, function () {
  console.log(
    "---------------------------------------------------------\n\n" +
    "                        Server name                        \n" +
    "                          WebMIDI                          \n" +
    "_________________________________________________________  \n"
  );
  console.log(`[i] Server started on ${config.SERVER_IP}:${config.SERVER_PORT} using ${config.ENVIRONMENT} environment`);
});
