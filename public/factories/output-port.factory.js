'use strict';
angular.module('WebMIDI').factory('OutputPort', function (WebMidi) {
    return function OutputPort(virtual, port) {
        var synth = null; // new Tone.Synth().toMaster();
        var muted = false;

        this.isVirtual = virtual;
        this.MIDIOutput = port;
        this.id = port.id;
        this.name = port.name;
        this.send = sendFn();

        function sendFn() {
            if (virtual) {
                // GO STRAIGHT TO SPEAKERS USING TONE.JS
                synth = new Tone.Synth().toMaster();
                console.log('Virtual Output created. Using sendVirtual()');
                return sendVirtual;
            } else {
                return sendPhysical;
            }
        }

        function sendVirtual(data) {
            if (!muted) {
                WebMidi.virtualSend(synth, data);
            }
        }

        function sendPhysical(data) {
            if (!muted) {
                WebMidi.send(port, data)
            }
        }
    };
});