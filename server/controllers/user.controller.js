var request = require('request');

/**
 * TODO Check if the request cookie still had a logged-in user stored
 */
function getLoggedInUser(req, res) {
    var user = req.user;
    if (!user) {
        res.status(401);
    }
    res.send(user);
}

function getProfile(req, res) {
    var accessToken = req.query.access_token;
    console.log('getProfile session : ', req.session);
    if (accessToken) {
        request({
            url: 'https://www.googleapis.com/auth/userinfo.profile',
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
    getLoggedInUser: getLoggedInUser,
    getProfile: getProfile
};