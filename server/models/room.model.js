'use strict';
var path = require('path');
var UserSchema = require(path.resolve(__dirname + '/user.model.js')).Schema;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomUserSchema = new Schema({
    user: {type: UserSchema, required: true},
    keys: {type: [Number], required: true} // Array containing numbers between 0 and 127
});

var RoomSchema = new Schema({
    name: {type: String, required: true},
    users: {type: [RoomUserSchema], required: true},
    owner: {type: UserSchema, required: true},
    password: {type: String, required: false, default: null},
    passwordRequired: {type: Boolean, required: true, default: false},
    possession: {type: String, required: false, default: null}
});

var Room = mongoose.model('room', RoomSchema);
var RoomUser = mongoose.model('room-user', RoomUserSchema);

module.exports = {
    Room: Room,
    RoomUser: RoomUser,
    Schema: RoomSchema,
    RoomUserSchema: RoomUserSchema
};
