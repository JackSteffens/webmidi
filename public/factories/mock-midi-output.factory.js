'use strict';
angular.module('WebMIDI').factory('MockMIDIOutput', function ($q, WebMidi, SynthService) {
    /**
     * @param {String} id
     * @param {String} name
     * @param {Function} onstatechange
     */
    return function MockMIDIOutput(id, name, onstatechange) {
        var muted = false; // TODO Create setter/getter

        this.id = id;
        this.manufacturer = 'virtual manufacturer';
        this.name = name;
        this.type = 'output'; // MIDIPortType
        this.version = 'virtual version';
        this.state = 'connected'; // MIDIPortDeviceState
        this.connection = 'connection'; // MIDIPortConnectionState
        this.onstatechange = onstatechange; // EventHandler
        this.open = openFn; // return Promise<MIDIPort>
        this.close = closeFn; // return Promise<MIDIPort>
        this.send = sendFn(); // void([command, note, velocity], timestamp);
        this.clear = clearFn(); // void();


        function sendFn() {
            console.log('Virtual Output created. Using sendVirtual()');
            return sendVirtual;
        }

        function sendVirtual(data) {
            var command = data[0];
            var note = data[1];
            var velocity = data[2];

            if (velocity !== null && velocity !== undefined) {
                velocity = velocity / 127
            }

            if (command === 128 && velocity !== 0) {
                velocity = 0;
            } else if (command === 144 && velocity === 0) {
                command = 128;
            }

            data = [command, note, velocity];

            if (!muted) {
                WebMidi.virtualSend(SynthService.synth, data);
            }
        }

        function clearFn() {
            return angular.noop;
        }

        function openFn() {
            return $q(function (resolve) {
                this.connection = 'open';
                resolve(this);
            }.bind(this));
        }

        function closeFn() {
            return $q(function (resolve) {
                this.connection = 'closed';
                resolve(this);
            }.bind(this));
        }
    };
});