'use strict';
angular.module('WebMIDI').service('Socket', function ($http, Api) {
    this.subscribe = subscribe;
    this.unsubscribe = unsubscribe;
    this.init = init;
    this.getSocket = getSocket;
    this.joinRoom = joinRoom;
    this.sendToRoom = sendToRoom;

    var socket = null;
    var domain = Api.domain;
    var room = null;

    function init() {
        socket = io.connect(domain);
        socket.on('connected', function (data) {
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

    function joinRoom(roomId) {
        room = io.connect(Api.domain + '/' + roomId);
        room.on('notes', function (message) {
            console.log('A note has been played');
            // TODO Play note on the user's keyboard which the note was received from
            console.log(message);
        });
        room.on('users', function (message) {
            console.log('A user has joined');
            // TODO Create keyboard for user
            console.log(message);
        });
    }

    function getSocket() {
        return socket;
    }

    function sendToRoom(channel, message) {
        if (room) {
            room.emit(channel, message);
        } else {
            console.warn('Websocket is not connected to specified room');
        }
    }

    return this;
});
