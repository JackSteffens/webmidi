angular.module('WebMIDI').controller('LobbyCtrl', function ($scope, $http, Api) {
    $scope.createRoom = createRoom;

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

    function createRoom() {
        var room = {
            name: $scope.room.name,
            password: $scope.room.password
        };

        $http.post(Api.url.room, room)
            .then(function (res) {
                var newRoom = res.data;
                console.log(newRoom);
                $scope.room = null;
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