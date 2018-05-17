angular.module('WebMIDI').factory('KeyboardModel', function () {
    /**
     * @param {String} portId
     * @param {String} portName
     * @param {Number} keyLength
     * @param {Array<Number>} keys
     */
    return function KeyboardModel(portId, portName, keyLength, keys) {
        this.portId = portId;       // MIDIInput.id
        this.portName = portName;   // MIDIInput.???
        this.keyLength = keyLength; // Amount of notes
        this.keys = keys;           // All notes in array from
    }
});