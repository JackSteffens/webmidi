'use strict';

// Dependencies
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var morgan = require('morgan');             // Console logging
var bodyParser = require('body-parser');    // Application headers
var http = require('http');
var passport = require('passport');

var config = require('./config.js');
var websocket = require('./server/utils/websocket.js'); // Global socket.io websocket
var router = require('./router.js');
var authentication = require('./server/services/authentication.service.js');

// Configuration
// TODO Don't use callbacks, use Promise
mongoose.connect(config.DATABASE, function (err) {
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
app.use(session({secret: 'webmidi', resave: true, saveUninitialized: true}));

// Set authentication strategies
app.use(passport.initialize());
app.use(passport.session());
authentication.init();

// Set routing
router.setRequestUrl(app);

// Socket.io
var server = http.createServer(app); // Server, required for socket.io
websocket.init(server);

// Start server
server.listen(3000, 'localhost', function () {
    console.log(
        "---------------------------------------------------------\n\n" +
        "                        Server name                        \n" +
        "                          WebMIDI                          \n" +
        "_________________________________________________________  \n"
    );
    console.log("[i] Server started on localhost:3000");
});
