'use strict';
angular.module('WebMIDI').controller('LoginCtrl', function ($scope, WebMidi, $state, $http, Api, Authenticate) {
    $scope.loginTitle = 'This is the login title';
    $scope.username = '';
    $scope.verified = false;

    $scope.loginUsingGoogle = loginUsingGoogle;

    function verifyAccessToken() {
        var accessToken = $state.params['access_token'];
        if (accessToken) {
            console.log(accessToken);
            Authenticate.login(accessToken).then(function () {
                $state.go('setup');
            }, function (error) {
                console.warn('Access token failure');
                console.log(error);
                Authenticate.setAccessToken(undefined);
            });
        }
    }

    function loginUsingGoogle() {
        var params = {
            'client_id': '439345663761-vinca9jn7fsonkj8bg6pdjr39kuevdka.apps.googleusercontent.com',
            'redirect_uri': 'http://localhost:3000/redirect',
            'response_type': 'token',
            'scope': 'https://www.googleapis.com/auth/userinfo.profile',
            'include_granted_scopes': 'true',
            'state': 'pass-through value',
            'prompt': 'consent'
        };

        location.href = Api.url.oauth +
            '?client_id=' + params.client_id +
            '&redirect_uri=' + params.redirect_uri +
            '&response_type=' + params.response_type +
            '&scope=' + params.scope +
            '&include_granted_scopes=' + params.include_granted_scopes +
            '&state=' + params.state +
            '&prompt=' + params.prompt
    }

    this.$onInit = function () {
        verifyAccessToken();
    }
});