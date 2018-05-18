'use strict';
angular.module('WebMIDI').controller('MidiSelectorCtrl', function ($scope, $q, WebMidi) {
    $scope.doShit = function (port) {
        console.log('doShit()' + port.id);
        $scope.selectPort(port);
    }
});