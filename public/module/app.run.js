'use strict';
angular.module('WebMIDI').run(function ($rootScope, $state, Socket, Authenticate, UserModel) {
    Socket.init();

    function setCurrentUser(user, accessTokenProfile, accessToken) {
        Authenticate.setCurrentUser(new UserModel(
            user._id,
            user.name,
            user.firstName,
            user.lastName,
            accessTokenProfile.email,
            accessToken,
            accessTokenProfile.exp,
            user.googleId
        ));
    }

    /**
     * TODO Get session from session cookie, not from the stored access token!
     */
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        console.log(toState);
        console.log('authenticated : ' + Authenticate.isAuthenticated());
        // Check if user was already logged in (get session)
        if (!Authenticate.isAuthenticated()) {
            var accessToken = Authenticate.getAccessToken();
            if (accessToken) {
                Authenticate.verifyAccessToken(accessToken)
                    .then(function () {
                        console.log('Restored session from working access token');
                    }, function () {
                        stateLogin(toState, event)

                    });
            } else {
                stateLogin(toState, event);
            }
        }
    });

    function stateLogin(toState, event) {
        if (toState.authenticate) {
            console.log('Unauthorized for current page');
            event.preventDefault();
            $state.go('login');
        }
    }
});