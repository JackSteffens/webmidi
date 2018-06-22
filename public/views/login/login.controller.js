'use strict';
angular.module('WebMIDI').controller('LoginCtrl', function ($scope, WebMidi, $state, $http, $cookies, $q, Api, Authenticate) {
    $scope.loginTitle = 'This is the login title';
    $scope.username = '';
    $scope.verified = false;

    function verifyAccessToken() {
        var accessToken = $state.params['access_token'];
        if (accessToken) {
            console.log(accessToken);
            $q.all([
                Authenticate.verifyAccessToken(accessToken),
                Authenticate.fetchCurrentUser()
            ]).then(function () {
                $state.go('setup');
            }, function (error) {
                console.warn('Access token failure');
                console.error(error);
                Authenticate.setAccessToken(undefined);
            });
        }
    }

    this.$onInit = function () {
        verifyAccessToken();
    }
});