'use strict';
angular.module('WebMIDI').service('PlayerKeyboardService', function () {
    var _keyboard = null;
    this.setKeyboard = function (keyboard) {
        _keyboard = keyboard;
    };

    this.getKeyboard = function () {
        return _keyboard;
    };
});