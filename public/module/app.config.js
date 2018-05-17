'use strict';
angular.module('WebMIDI').config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('main', {
            title: 'Main',
            templateUrl: '../views/main/main.html',
            controller: 'MainCtrl',
            url: '/'
        })
        .state('login', {
            title: 'Login',
            templateUrl: '../views/login/login.html',
            controller: 'LoginCtrl',
            url: '/login'
        });
});