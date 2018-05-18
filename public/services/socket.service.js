'use strict';
angular.module('WebMIDI').service('Socket', function ($http, Api) {
    this.subscribe = subscribe;
    this.unsubscribe = unsubscribe;
    this.init = init;
    this.getSocket = getSocket;

    var socket = null;
    var domain = Api.domain;

    function init() {
        socket = io.connect(domain);

        // socket.join('connected');
        socket.on('test', function (data) {
            console.log(data);
            // socket.emit('my other event', { my: 'data' });
        });

        socket.on('update', function (data) {
            console.log(data);
        });
    }

    function subscribe(channel, callback) {
        socket.on(channel, function (data) {
            callback(data);
        });
    }

    /**
     * Unsubscribe from channel
     * @param {String} channel
     */
    function unsubscribe(channel) {
        // ??
    }

    function getSocket() {
        return socket;
    }

    return this;
});
