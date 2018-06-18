'use strict';
angular.module('WebMIDI').controller('LoginCtrl', function ($scope, WebMidi, $state, $http, $cookies, Api, Authenticate) {
    $scope.loginTitle = 'This is the login title';
    $scope.username = '';
    $scope.verified = false;

    function verifyAccessToken() {
        var accessToken = $state.params['access_token'];
        console.log('state params : ');
        console.log($state.params);
        if (accessToken) {
            console.log(accessToken);
            Authenticate.verifyAccessToken(accessToken).then(function () {
                $state.go('setup');
            }, function (error) {
                console.warn('Access token failure');
                console.log(error);
                Authenticate.setAccessToken(undefined);
            });
        }
    }

    this.$onInit = function () {
        verifyAccessToken();
    }
});