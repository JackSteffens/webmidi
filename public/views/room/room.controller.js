angular.module('WebMIDI').controller('RoomCtrl', function ($scope, $filter, $mdToast, $state, RoomService, Socket) {
    $scope.room = {};

    this.$onInit = function () {
        var roomId = $state.params['roomId'];

        if (!roomId) {
            $mdToast.showSimple('No room ID specified');
            $state.go('lobby');
        } else {
            RoomService.joinRoom(roomId)
                .then(function (room) {
                    $scope.room = room;
                    Socket.joinRoom(roomId);
                    Socket.sendToRoom('notes', 'hello');
                }, function (error) {
                    $mdToast.showSimple(error);
                });
        }
    }
});