var path = require('path');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var userRepo = require(path.resolve(__dirname + '/../repositories/user.repository.js'));
var config = require(path.resolve(__dirname + '/../../config.js'));

function init() {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        userRepo.getUserById(id, function (err, user) {
            console.log(user);
            if (err) console.error(err);
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_SECRET_KEY,
            callbackURL: config.GOOGLE_CALLBACK_SERVER_URL
        },
        function (accessToken, refreshToken, profile, done) {
            // TODO Don't Get and Update, just use Update! (findByGoogleIdAndUpdate)
            userRepo.getUserByGoogleId(profile.id, function (error, user) {
                if (error) console.error(error);
                else if (!user) {
                    user = {
                        email: 'email@test.com',
                        name: profile.displayName,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        accessToken: accessToken,
                        accessTokenExpiry: 0,
                        googleId: profile.id
                    };
                    userRepo.createUser(user, function (error, newUser) {
                        if (error) console.error(error);
                        else if (newUser) console.log('New user created with Google ID : ' + newUser.googleId + ' and Id : ' + newUser.id);
                        done(null, newUser);
                    })
                } else {
                    user = {
                        id: user.id,
                        email: 'email@test.com',
                        name: profile.displayName,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        accessToken: accessToken,
                        accessTokenExpiry: 0,
                        googleId: profile.id
                    };
                    userRepo.updateUser(user, function (error, newUser) {
                        if (error) console.error(error);
                        else if (newUser) console.log('Updated existing user with Google ID : ' + newUser.googleId + ' and Id : ' + newUser.id);
                        done(null, newUser);
                    });
                }
            })
        }
    ));
}

module.exports = {
    init: init
};