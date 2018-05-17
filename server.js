'use strict';

// Dependencies
var express = require('express');         // Server
var app = express();                      // Express Application
var mongoose = require('mongoose');       // Database
var morgan = require('morgan');           // Console logging
var bodyParser = require('body-parser');  // Application headers
var config = require('./config.js');      // Config params
var router = require('./router.js');      // Controller routing
var colors = require('colors');           // Console colors

// Configuration
mongoose.connect(config.DATABASE, function(err) {
    if (err) {
        console.log(('[!] Unable to connect to database.\n').red + (err).toString().yellow);
        return process.exit();
    }
}); // Connect to DB
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type : 'application/vnd.api+json'}));

// Set routing
router.setRequestUrl(app);

// Socket.io
var server = require('http').createServer(app); // Server, required for socket.io

// Start server
server.listen(3000, 'localhost', function() {
    console.log(
        "---------------------------------------------------------\n\n" +
        "                        Server name                        \n" +
        "                          WebMIDI                          \n" +
        "_________________________________________________________  \n"
    );
    console.log("[i] Server started on localhost:3000");
});
