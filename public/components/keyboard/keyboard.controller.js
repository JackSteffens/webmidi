'use strict';
/**
 * @property {KeyboardModel} scope.keyboardModel
 */
angular.module('WebMIDI').controller('KeyboardCtrl', function ($scope, WebMidi, KeyboardModel) {
    $scope.sendToOutput = sendToOutput;

    $scope.velocity = 100;
    $scope.keys = [];

    function init() {
        initInputEventWatcher();
    }

    /**
     * TODO
     * @param {Number} command 144 = activate key
     * @param {Key} key
     * @param {Number} velocity between 0 and 127, with 0 being off.
     */
    function sendToOutput(command, key, velocity) {
        toggleKey(key, velocity);
        if (validOutput($scope.keyboardModel.output)) {
            $scope.keyboardModel.output.send([command, key.number, velocity]);
        } else {
            console.warn('No connected output port');
        }
    }

    /**
     *
     * @param {MIDIOutput} output
     * @return {*|boolean}
     */
    function validOutput(output) {
        return output && output.connection && output.connection === 'open';
    }

    /**
     *
     * @param {Key} key
     * @param {Number} velocity
     */
    function toggleKey(key, velocity) {
        key.active = velocity !== 0;
    }

    function initInputEventWatcher() {
        $scope.$on('keyevent', function (event, midiMessageEvent) {
            console.log('keyevent received');
            console.log(midiMessageEvent);

            var command = midiMessageEvent.data[0];
            var keyNumber = midiMessageEvent.data[1];
            var velocity = midiMessageEvent.data[2];
            var key = $scope.keyboardModel.keys[keyNumber - $scope.keyboardModel.minKeyNumber];

            if (key) {
                key.active = velocity !== 0 || command === 128;
            }

            command = velocity === 0 && command === 144 ? 128 : command;

            if (!inputSameSourceAsOutput()) {
                if (validOutput($scope.keyboardModel.output)) {
                    $scope.keyboardModel.output.send([command, keyNumber, velocity]);
                }
            }
        }, true);
    }

    function inputSameSourceAsOutput() {
        return $scope.keyboardModel.outputName === $scope.keyboardModel.inputName;
    }

    init();
});