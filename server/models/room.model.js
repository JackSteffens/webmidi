'use strict';
var User = require('user.model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    users: [{type: User, required: true}]
});

var Room = mongoose.model('room', RoomSchema);

module.exports = {
    Room: Room,
    Schema: Room
};
