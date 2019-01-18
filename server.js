'use strict';

// Dependencies
var express = require('express');
var session = require('express-session');
var sharedsession = require("express-socket.io-session");
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');             // Console logging
var bodyParser = require('body-parser');    // Application headers
var http = require('http');
var passport = require('passport');
var io = require('socket.io');
var colors = require('colors');

var config = require('./config.js');
var websocket = require('./server/utils/websocket.js'); // Global socket.io websocket
var router = require('./router.js');
var authentication = require('./server/services/authentication.service.js');

// Configuration
// TODO Don't use callbacks, use Promise
mongoose.connect(config.DATABASE, {
    user: config.DATABASE_USERNAME,
    pass: config.DATABASE_PASSWORD,
    dbName:config.DATABASE_NAME
}, function (err) {
    if (err) {
        console.log(('[!] Unable to connect to database.\n').red + (err).toString().yellow);
        return process.exit();
    }
});
var app = express();
app.use(express.static(__dirname + '/public'));
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
var server = http.Server(app); // Server, required for socket.io
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
