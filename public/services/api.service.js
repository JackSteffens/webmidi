'use strict';
angular.module('WebMIDI').service('Api', function () {
    this.domain = window.location.href.substr(0,
        window.location.href.length - window.location.hash.length - 1);
    this.baseUrl = this.domain + '/api';

    this.url = {
        room: this.baseUrl + '/room/',
        rooms: this.baseUrl + '/rooms/',
        user: this.baseUrl + '/user',
        profile: this.baseUrl + '/profile',
        oauth: 'https://accounts.google.com/o/oauth2/v2/auth',
        verifyAccessToken: 'https://www.googleapis.com/oauth2/v3/tokeninfo'
    };

    this.cookie = {
        access_token: 'access_token',
        access_token_exp: 'access_token_exp'
    };
});