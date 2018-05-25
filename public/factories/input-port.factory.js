'use strict';
angular.module('WebMIDI').factory('InputPort', function (WebMidi) {
    return function InputPort(virtual, port) {
        this.isVirtual = virtual;
        this.MIDIInput = port;
        this.id = port.id;
        this.name = port.name;
        this.onmidimessage = eventHandler;

        // attribute EventHandler onmidimessage

        function eventHandler() {
            if (virtual) {
                // TODO ToneJS
            } else {
                return port.onmidimessage;
            }
        }
    };
});