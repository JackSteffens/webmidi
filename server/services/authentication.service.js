var path = require('path');
var userRepo = require(path.resolve(__dirname + '/../repositories/user.repository.js'));
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function init() {

    /**
     * TODO Apply strategy as described in your note book.
     * Verify the Google access token from inside, then store in the local user model.
     * Check authorization is then done by checking whether a user exists with said access token and
     * whether it's still valid based on its expiry timestamp
     */
    passport.use(new LocalStrategy(
        // function (email, password, done) {
        //     userRepo.getUserByEmail(email, function (err, user) {
        //         if (err) {
        //             return done(err);
        //         }
        //         if (!user) {
        //             return done(null, false, {message: 'Incorrect username.'});
        //         }
        //         if (!user.validPassword(password)) {
        //             return done(null, false, {message: 'Incorrect password.'});
        //         }
        //         return done(null, user);
        //     });
        // }
    ));
}

module.exports = {
    init: init
};