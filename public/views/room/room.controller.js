angular.module('WebMIDI').controller('RoomCtrl', function ($scope, $filter, $mdToast, $state, RoomService, Socket) {
    $scope.sendNoteToRoom = sendNoteToRoom;

    $scope.room = {};

    function sendNoteToRoom() {
        Socket.sendNoteToRoom('notes', 'THIS IS MY NOTE');
    }

    /**
     *
     * @param {String} roomId
     * @param {Object} roomUserObj
     * @param {User} roomUserObj.user
     * @param {Array<Number>} roomUserObj.keys
     */
    function notifyUserJoined(roomId, roomUserObj) {
        RoomService.setUserKeyboard(roomUserObj);
        var existingRoomUserObj = RoomService.getRoomUserInRoom($scope.room, roomUserObj.user);
        if (existingRoomUserObj) {
            existingRoomUserObj.user = roomUserObj.user;
            existingRoomUserObj.keys = roomUserObj.keys;
            existingRoomUserObj.keyboard = roomUserObj.keyboard;
        } else {
            $scope.room.users.push(roomUserObj);
        }
        $scope.$apply();
    }

    /**
     *
     * @param {String} roomId
     * @param {User} user
     */
    function notifyUserLeft(roomId, user) {
        if (user && user._id) {
            RoomService.removeUserFromRoom($scope.room, user._id)
                .then(function () {
                    $mdToast.showSimple(user.name + ' left the room')
                }, function () {
                    console.error('Unable to remove user from room');
                });
        }
    }

    /**
     * TODO
     * @param roomId
     * @param noteObj
     */
    function notifyNotePlayed(roomId, noteObj) {
        console.log('Note played from websocket', noteObj);
    }

    function joinRoom() {
        var roomId = $state.params['roomId'];
        var keys = RoomService.getPlayerOneKeys();

        if (!roomId) {
            $mdToast.showSimple('No room ID specified');
            $state.go('lobby');
        } else if (!keys || !(keys.length > 0)) {
            $mdToast.showSimple('No keyboard configured');
            $state.go('lobby');
        } else {
            RoomService.joinRoom(roomId, keys)
                .then(function (room) {
                    $scope.room = room;
                    $scope.room.users.forEach(function (user) {
                        RoomService.setUserKeyboard(user);
                    });
                    Socket.send('joinRoom', roomId);
                    Socket.joinRoom(roomId);
                }, function (error) {
                    $mdToast.showSimple(error);
                });
        }
    }

    this.$onInit = function () {
        Socket.setNotifyUserJoined(notifyUserJoined);
        Socket.setNotifyNotePlayed(notifyNotePlayed);
        Socket.setNotifyUserLeft(notifyUserLeft);
        joinRoom();
    };

    /**
     * For some reason Angular does not trigger controllerInstance.$onDestroy like it does with $onInit, therefore
     * use this event listener instead.
     */
    $scope.$on('$destroy', function () {
        onDestroy();
    });

    function onDestroy() {
        console.log('destroying room controller');
        Socket.setNotifyNotePlayed(null);
        Socket.setNotifyUserJoined(null);
        Socket.setNotifyUserLeft(null);
        if ($scope.room && $scope.room._id) {
            var roomId = $scope.room._id;
            Socket.leaveRoom(roomId);
            Socket.send('leaveRoom', roomId);
            console.log('Leaving room : ' + roomId);
            RoomService.leaveRoom(roomId)
                .then(function () {
                    $mdToast.showSimple('Left room ' + roomId)
                }, function (error) {
                    $mdToast.showSimple(error);
                });
        }
    }
});