'use strict';
angular.module('WebMIDI').directive('midiSelector', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/midi-selector/midi-selector.html',
        controller: 'MidiSelectorCtrl',
        replace: true,
        scope: {
            inputs: '=',
            outputs: '=',
            selectedInput: '=',
            selectedOutput: '=',
            selectPort: '<'
        }
    }
});