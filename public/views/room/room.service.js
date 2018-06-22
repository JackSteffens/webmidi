'use strict';
angular.module('WebMIDI').service('RoomService', function (Api, $http, $q, KeyboardModel, WebMidi, Key, PlayerKeyboardService) {
    this.getRoom = getRoom;
    this.joinRoom = joinRoom;
    this.setUserKeyboards = setUserKeyboards;
    this.getPlayerOneKeys = getPlayerOneKeys;

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

    function setUserKeyboards(room) {
        room.users.forEach(function (user) {
            var output = WebMidi.getSelectedMIDIOutput();
            var input = {id: user.user._id, name: user.user.name};
            var keys = [];
            user.keys.forEach(function (key) {
                keys.push(new Key(key))
            });
            user.keyboard = new KeyboardModel(input, output, keys);
        })
    }

    /**
     *
     * @param {String} roomId
     * @param {Array<Number>} keys array of numbers between 0 and 127
     * @return {*}
     */
    function joinRoom(roomId, keys) {
        return $q(function (resolve, reject) {
            $http.post(Api.url.joinRoom, {'roomId': roomId, 'keys': keys})
                .then(function (res) {
                    resolve(res.data);
                }, function (res) {
                    console.error('An error occurred joining room ' + roomId);
                    console.log(res);
                    reject(res.data);
                });
        });
    }
});