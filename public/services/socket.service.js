'use strict';
angular.module('WebMIDI').service('Socket', function ($http, Api) {
    this.init = init;
    this.send = send;
    this.getSocket = getSocket;
    this.joinRoom = joinRoom;
    this.leaveRoom = leaveRoom;
    this.sendNoteToRoom = sendNoteToRoom;
    this.setNotifyNotePlayed = setNotifyNotePlayed;
    this.setNotifyUserJoined = setNotifyUserJoined;
    this.setNotifyUserLeft = setNotifyUserLeft;

    var _notifyUserJoined = null;
    var _notifyNotePlayed = null;
    var _notifyUserLeft = null;

    var socket = null;
    var domain = Api.domain;
    var room = null;

    function init() {
        socket = io.connect(domain);
        socket.on('connected', function (data) {
            console.log(data);
        });
    }

    /**
     *
     * @param {String} roomId
     */
    function joinRoom(roomId) {
        socket.on(roomId, function (message) {
            if (typeof message === 'string') {
                try {
                    message = JSON.parse(message);
                } catch (e) {
                    console.error(e);
                }
            }
            handleRoomMessage(roomId, message);
        });
    }

    /**
     *
     * @param {String} roomId
     */
    function leaveRoom(roomId) {
        socket.off(roomId)
    }

    /**
     *
     * @param {String} roomId
     * @param {Object} message
     * @param {String} message.key
     * @param {Object} message.value
     */
    function handleRoomMessage(roomId, message) {
        switch (message.key) {
            case 'note':
                console.log('Someone played a note in this room', message.value);
                if (_notifyNotePlayed) {
                    _notifyNotePlayed(roomId, message.value);
                }
                break;
            case 'user':
                console.log('user message received');
                if (_notifyUserJoined) {
                    _notifyUserJoined(roomId, message.value);
                }
                break;
            case 'deleteuser':
                console.log('deleteuser message received');
                if (_notifyUserLeft) {
                    _notifyUserLeft(roomId, message.value);
                }
                break;
            default:
                console.warn('Unknown message', message.key);
                break;
        }
    }

    function getSocket() {
        return socket;
    }

    /**
     *
     * @param roomId
     * @param userId
     * @param key
     */
    function sendNoteToRoom(roomId, userId, key) {
        var message = {
            key: 'note',
            value: {
                owner: userId,
                key: key
            }
        };
        socket.send(roomId, message);
    }

    /**
     * General socket.io send
     * @param {String} event
     * @param {*} message
     */
    function send(event, message) {
        socket.send(event, message);
    }

    function setNotifyNotePlayed(fn) {
        _notifyNotePlayed = fn;
    }

    function setNotifyUserJoined(fn) {
        _notifyUserJoined = fn;
    }

    function setNotifyUserLeft(fn) {
        _notifyUserLeft = fn;
    }

    return this;
});
