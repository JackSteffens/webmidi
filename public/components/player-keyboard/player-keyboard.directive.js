'use strict';
angular.module('WebMIDI').directive('playerKeyboard', function () {
    return {
        restrict: 'E',
        controller: 'PlayerKeyboardCtrl',
        templateUrl: 'components/player-keyboard/player-keyboard.html'
    }
});