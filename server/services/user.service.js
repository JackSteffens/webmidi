var config = require('../../config.js');
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

function login() {
    passport.use(new GoogleStrategy({
            consumerKey: config.GOOGLE_CONSUMER_KEY,
            consumerSecret: config.GOOGLE_CONSUMER_SECRET,
            callbackURL: "http://www.example.com/auth/google/callback"
        },
        function (token, tokenSecret, profile, done) {
            User.findOrCreate({googleId: profile.id}, function (err, user) {
                return done(err, user);
            });
        }
    ));

    passport.use('provider', new OAuth2Strategy({
            authorizationURL: 'https://www.provider.com/oauth2/authorize',
            tokenURL: 'https://www.provider.com/oauth2/token',
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_SECRET_KEY,
            callbackURL: config.GOOGLE_CALLBACK_URL
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate(X, function (err, user) {
                done(err, user);
            });
        }
    ));
}


module.exports = {};