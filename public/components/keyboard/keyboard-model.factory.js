'use strict';
angular.module('WebMIDI').factory('KeyboardModel', function (InputPort) {
    /**
     * @param {MIDIInput} input
     * @param {MIDIOutput} input
     * @param {Array<Key>} keys
     */
    return function KeyboardModel(input, output, keys) {
        console.debug('Creating new keyboard using output : ' + output.name);
        console.debug(keys);

        if (input) {
            this.input = input;
            this.inputId = input.id;
            this.inputName = input.name;
            console.debug('KeyboardModel connected using input : ' + input.name);
        }

        if (output) {
            this.output = output;
            this.outputId = output.id;
            this.outputName = output.name;
            console.debug('KeyboardModel connected using output : ' + output.name);
        }

        this.keyLength = keys.length; // Amount of notes
        this.keys = keys;           // All notes in array from
        if (keys && keys.length) {
            this.minKeyNumber = keys[0].number;
            this.minKeyNote = keys[0].note;
            this.maxKeyNumber = keys[keys.length-1].number;
            this.maxKeyNote = keys[keys.length-1].note;
        }
    }
});