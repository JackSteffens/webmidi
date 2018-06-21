'use strict';
angular.module('WebMIDI').service('RoomService', function (Api, $http, $q) {
    this.getRoom = getRoom;
    this.joinRoom = joinRoom;

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

    function joinRoom(roomId) {
        return $q(function (resolve, reject) {
            $http.post(Api.url.joinRoom, {'roomId': roomId})
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