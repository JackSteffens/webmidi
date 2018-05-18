'use strict';
angular.module('WebMIDI').factory('KeyboardModel', function (InputPort) {
    /**
     * @param {String} portId
     * @param {String} portName
     * @param {Number} keyLength
     * @param {Array<Key>} keys
     */
    return function KeyboardModel(output, keys) {
        console.log('Creating new keyboard using output : ' + output.name);
        this.output = output;
        this.outputId = output.id;       // MIDIInput.id
        this.outputName = output.name;   // MIDIInput.???
        this.keyLength = keys.length; // Amount of notes
        this.keys = keys;           // All notes in array from
    }
});