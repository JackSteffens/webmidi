'use strict';
angular.module('WebMIDI').config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/lobby');
    $stateProvider
        .state('login', {
            title: 'Login',
            templateUrl: '../views/login/login.html',
            controller: 'LoginCtrl',
            url: '/login?access_token',
            authenticate: false
        })
        .state('setup', {
            title: 'Setup',
            templateUrl: '../views/setup/setup.html',
            controller: 'SetupCtrl',
            url: '/setup',
            authenticate: true
        })
        .state('lobby', {
            title: 'Lobby',
            templateUrl: '../views/lobby/lobby.html',
            controller: 'LobbyCtrl',
            url: '/lobby',
            authenticate: true
        });
});