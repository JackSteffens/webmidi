'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    accessToken: {type: String, required: true},
    accessTokenExpiry: {type: Number, required: true}
});

var User = mongoose.model('user', UserSchema);

module.exports = {
    User: User,
    Schema: UserSchema
};
