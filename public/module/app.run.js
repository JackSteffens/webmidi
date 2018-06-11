'use strict';
angular.module('WebMIDI').run(function ($rootScope, $state, Socket, Authenticate, $http, Api) {
    Socket.init();

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        console.log(toState);
        console.log('authenticated : ' + Authenticate.isAuthenticated());
        // Check if user was already logged in (get session)
        if (!Authenticate.isAuthenticated()) {
            // TODO Get accessToken from cookie and verify the token using Api.url.verifyAccessToken
            $http({
                method: "GET",
                url: Api.url.user
            }).then(function (res) {
                if (res.data && res.data.name && res.data.id) {
                    Authenticate.setCurrentUser(res.data);
                    console.log('You are already logged in. Restored session');
                } else if (toState.authenticate) {
                    // Check for login requirement or else re-route to login page.
                    stateLogin(event);
                }
            }, function () {
                if (toState.authenticate) {
                    stateLogin(event);
                }
            });
        }
    });

    function stateLogin(event) {
        console.log('Unauthorized for current page');
        event.preventDefault();
        $state.go('login');
    }
});