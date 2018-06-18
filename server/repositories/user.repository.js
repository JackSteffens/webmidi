var path = require('path');
var User = require(path.resolve(__dirname + '/../models/user.model.js')).User;

/**
 * TODO Promise instead of Callback
 * @param userId
 * @param callback
 */
function getUserById(userId, callback) {
    User.findOne({
        '_id': userId
    }, function (error, user) {
        return callback(error, user);
    });
}

/**
 * TODO Promise instead of Callback
 * @param googleId
 * @param callback
 */
function getUserByGoogleId(googleId, callback) {
    User.findOne({
        'googleId': googleId
    }, function (error, user) {
        return callback(error, user);
    });
}

/**
 *
 * @param accessToken
 * @param callback
 */
function getUserByAccessToken(accessToken, callback) {
    User.findOne({
        'accessToken': accessToken
    }, function (error, user) {
        return callback(error, user);
    });
}


/**
 * TODO Promise instead of Callback
 * @param user
 * @param callback
 */
function updateUser(user, callback) {
    User.findByIdAndUpdate(user.id,
        user,
        {'new': true},
        function (error, newUser) {
            return callback(error, newUser);
        });
}

/**
 * TODO Promise instead of Callback
 */
function createUser(user, callback) {
    User.create(user, function (error, newUser) {
        return callback(error, newUser);
    });
}

module.exports = {
    createUser: createUser,
    getUserById: getUserById,
    getUserByAccessToken: getUserByAccessToken,
    updateUser: updateUser,
    getUserByGoogleId: getUserByGoogleId
};