angular.module('WebMIDI').controller('RoomCtrl', function ($scope, $filter, $mdToast, $state, RoomService, Socket, PlayerKeyboardService) {
    $scope.sendToRoom = sendToRoom;

    $scope.room = {};

    function sendToRoom() {
        Socket.sendToRoom('notes', 'THIS IS MY NOTE');
    }

    function setUserKeyboards() {
        $scope.room.users.forEach(function (user) {
            // TODO DUMMY KEYBOARD!!!!!!!
            user.keyboard = PlayerKeyboardService.getKeyboard();
        })
    }

    this.$onInit = function () {
        var roomId = $state.params['roomId'];

        if (!roomId) {
            $mdToast.showSimple('No room ID specified');
            $state.go('lobby');
        } else {
            RoomService.joinRoom(roomId)
                .then(function (room) {
                    $scope.room = room;
                    setUserKeyboards();
                    Socket.joinRoom(roomId);
                    Socket.sendToRoom('notes', 'hello');
                }, function (error) {
                    $mdToast.showSimple(error);
                });
        }
    }
});