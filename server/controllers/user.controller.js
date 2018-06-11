var request = require('request');
var path = require('path');

/**
 *
 * @param req
 * @param res
 */
function login(req, res) {
    var username = req.body.user.name;
    // TODO Google Oauth using PassportJS

    if (username) {
        req.send(req.body.user);
    } else {
        res.status(400);
        res.send('No username')
    }
}

/**
 * TODO Check if the request cookie still had a logged-in user stored
 */
function getUser(req, res) {
    var user = {
        id: 'USER_ID',
        name: 'Anonymous'
    };

    console.log('Blocked for debugging reasons');

    res.status(400); // DEBUG
    res.send(user);
}

function getProfile(req, res) {
    var accessToken = req.query.access_token;
    if (accessToken) {
        request({
            url: 'https://www.googleapis.com/auth/plus.me',
            qs: {access_token: accessToken}
        }, function (error, response, body) {
            if (error) {
                res.status(response.statusCode);
                return res.send(error);
            }
            console.log(body);
            res.status(200);
            res.send(body);
        });
    } else {
        console.warn('No Access Code Given');
        res.status(400);
        res.send(new Error('No Access Code Given'));
    }
}

module.exports = {
    login: login,
    getUser: getUser,
    getProfile: getProfile
};