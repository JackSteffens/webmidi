'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true}
});

var User = mongoose.model('user', UserSchema);

module.exports = {
    User: User,
    Schema: User
};
