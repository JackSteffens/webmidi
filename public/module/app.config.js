'use strict';
angular.module('WebMIDI').config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('login', {
            title: 'Login',
            templateUrl: '../views/login/login.html',
            controller: 'LoggedOutCtrl',
            url: '/login'
        });
});