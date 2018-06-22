angular.module('WebMIDI').controller('RoomCtrl', function ($scope, $filter, $mdToast, $state, RoomService, Socket) {
    $scope.sendToRoom = sendToRoom;

    $scope.room = {};

    function sendToRoom() {
        Socket.sendToRoom('notes', 'THIS IS MY NOTE');
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
                    RoomService.setUserKeyboards($scope.room);
                    Socket.joinRoom(roomId);
                    Socket.sendToRoom('notes', 'hello');
                }, function (error) {
                    $mdToast.showSimple(error);
                });
        }
    }

    this.$onInit = function () {
        joinRoom();
    }
});