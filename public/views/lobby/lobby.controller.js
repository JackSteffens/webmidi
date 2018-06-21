angular.module('WebMIDI').controller('LobbyCtrl', function ($scope, $http, Api, $state) {
    $scope.createRoom = createRoom;
    $scope.joinRoom = joinRoom;

    function fetchRooms() {
        $http.get(Api.url.rooms)
            .then(function (res) {
                var rooms = res.data;
                $scope.rooms = rooms;
                console.log(rooms);
            }, function (res) {
                var error = res.data;
                console.error(error);
            });
    }

    function joinRoom(room) {
        $state.go('room', {roomId: room._id});
    }

    function createRoom() {
        var room = {
            name: $scope.room.name,
            password: $scope.room.password
        };

        $http.post(Api.url.room, room)
            .then(function (res) {
                var newRoom = res.data;
                joinRoom(newRoom);
            }, function (res) {
                console.error('SOME ERROR');
            })
            .finally(function () {
                fetchRooms();
            });
    }

    $scope.title = 'Lobby';

    this.$onInit = function () {
        fetchRooms();
    }
});