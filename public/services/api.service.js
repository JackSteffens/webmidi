'use strict';
angular.module('WebMIDI').service('Api', function () {
    this.domain = window.location.href.substr(0,
        window.location.href.length - window.location.hash.length - 1);
    this.baseUrl = this.domain + "/api";

    this.url = {
        room: this.baseUrl + "/room"
    }
});