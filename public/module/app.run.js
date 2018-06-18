'use strict';
angular.module('WebMIDI').run(function ($rootScope, $state, Socket, Authenticate) {
    Socket.init();

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        console.log(toState);
        console.log('authenticated : ' + Authenticate.isAuthenticated());
        // Check if user was already logged in (get session)
        if (!Authenticate.isAuthenticated()) {
            var accessToken = Authenticate.getAccessToken();
            if (accessToken) {
                Authenticate.login(accessToken)
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