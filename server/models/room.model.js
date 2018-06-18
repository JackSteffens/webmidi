'use strict';
var path = require('path');
var UserSchema = require(path.resolve(__dirname + '/user.model.js')).Schema;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: {type: String, required: true},
    users: {type: [UserSchema], required: true},
    ownerId: {type: String, required: true},
    password: {type: String, required: false, default: null},
    passwordRequired: {type: Boolean, required: true, default: false},
    possession: {type: String, required: false, default: null}
});

var Room = mongoose.model('room', RoomSchema);

module.exports = {
    Room: Room,
    Schema: RoomSchema
};
