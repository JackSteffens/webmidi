'use strict';
angular.module('WebMIDI').service('RoomService', function (Api, $http, $q, KeyboardModel, WebMidi, Key, PlayerKeyboardService) {
    this.getRoom = getRoom;
    this.getRoomId = getRoomId;
    this.joinRoom = joinRoom;
    this.leaveRoom = leaveRoom;
    this.setUserKeyboard = setUserKeyboard;
    this.getPlayerOneKeys = getPlayerOneKeys;
    this.getRoomUserInRoom = getRoomUserInRoom;
    this.removeUserFromRoom = removeUserFromRoom;
    this.sendNoteToRoom = sendNoteToRoom;

    var _roomId = null;

    function getRoom(roomId) {
        return $q(function (resolve, reject) {
            $http.get(Api.url.room, {params: {roomId: roomId}})
                .then(function (res) {
                    resolve(res.data);
                }, function () {
                    reject('No room found');
                });
        });
    }

    function getPlayerOneKeys() {
        var keyboardModel = PlayerKeyboardService.getKeyboard();
        var keys = keyboardModel ? keyboardModel.keys : [];
        var keyNumbers = [];
        keys.forEach(function (key) {
            keyNumbers.push(key.number);
        });
        return keyNumbers;
    }

    /**
     *
     * @param {RoomUser} roomUser
     * @param {User} roomUser.user
     */
    function setUserKeyboard(roomUser) {
        var output = WebMidi.getSelectedMIDIOutput();
        var input = {id: roomUser.user._id, name: roomUser.user.name};
        var keys = [];
        roomUser.keys.forEach(function (key) {
            keys.push(new Key(key))
        });
        roomUser.keyboard = new KeyboardModel(input, output, keys);
    }

    function notifyUserJoined() {

    }

    /**
     *
     * @param room
     * @param user
     */
    function getRoomUserInRoom(room, user) {
        for (var index = 0; index < room.users.length; index++) {
            if (room.users[index].user._id === user._id) {
                return room.users[index];
            }
        }
        return null;
    }

    /**
     *
     * @param {Room} room
     * @param {String} userId
     */
    function removeUserFromRoom(room, userId) {
        return $q(function (resolve, reject) {
            for (var userIndex = 0; userIndex < room.users.length; userIndex++) {
                if (room.users[userIndex].user._id === userId) {
                    room.users.splice(userIndex, 1);
                    return resolve();
                }
            }
            reject();
        });
    }

    /**
     *
     * @param {String} roomId
     * @param {Array<Number>} keys array of numbers between 0 and 127
     * @return {*}
     */
    function joinRoom(roomId, keys) {
        _roomId = roomId;
        return $q(function (resolve, reject) {
            $http.post(Api.url.joinRoom, {'roomId': roomId, 'keys': keys})
                .then(function (res) {
                    resolve(res.data);
                }, function (res) {
                    console.error('An error occurred joining room ' + roomId);
                    console.log(res);
                    reject(res.data);
                    _roomId = null;
                });
        });
    }

    function getRoomId() {
        return _roomId;
    }

    /**
     * Removes user from the room. Specified user is taken from Passport's authentication session
     * @param {String} roomId
     */
    function leaveRoom(roomId) {
        _roomId = null;
        return $q(function (resolve, reject) {
            $http.delete(Api.url.leaveRoom, {params: {'roomId': roomId}})
                .then(function () {
                    resolve();
                }, function (res) {
                    reject(res.data);
                });
        });
    }

    function sendNoteToRoom(note) {

    }
});