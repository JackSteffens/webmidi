angular.module('WebMIDI').controller('LobbyCtrl', function ($scope, $http, Api) {

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
        name: 'First room',
        password: 'password'
    };

        $http.post(Api.url.room, room)
            .then(function (res) {
                var newRoom = res.data;
            }, function (res) {
                console.error('SOME ERROR');
            });
    }

    $scope.title = 'This is the lobby';

    this.$onInit = function () {
        fetchRooms();
    }
});