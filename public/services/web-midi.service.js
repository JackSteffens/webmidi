'use strict';
angular.module('WebMIDI').service('WebMidi', function ($q) {
    var selectedMIDIInput, selectedMIDIOutput;

    this.getSelectedMIDIInput = getSelectedMIDIInput;
    this.getSelectedMIDIOutput = getSelectedMIDIOutput;
    this.setSelectedMIDIInput = setSelectedMIDIInput;
    this.setSelectedMIDIOutput = setSelectedMIDIOutput;
    this.getMIDIInputs = getMIDIInputs;
    this.requestMIDIAccess = requestMIDIAccess;
    this.getMIDIOutputs = getMIDIOutputs;
    this.send = send;

    function getSelectedMIDIInput() {
        return selectedMIDIInput;
    }

    function send(port, data) {
        console.log('Sending data to ' + port.id + '');
        port.send(data);
    }

    /**
     * TODO
     * @param {Array<Number>} dataArray
     */
    function readMIDIEvent(dataArray) {
        var command = dataArray[0];
        var note = dataArray[1];
        var velocity = dataArray.length > 2 ? dataArray[2] : 0;
    }

    readMIDIEvent(['a', 3, 3]);

    function getSelectedMIDIOutput() {
        return selectedMIDIOutput
    }

    /**
     *
     * @param {MIDIInput} input
     */
    function setSelectedMIDIInput(input) {
        if (selectedMIDIInput && selectedMIDIInput.close) {
            selectedMIDIInput.close();
        }
        selectedMIDIInput = input;
    }

    /**
     *
     * @param {MIDIOutput} output
     */
    function setSelectedMIDIOutput(output) {
        if (selectedMIDIOutput && selectedMIDIOutput.close) {
            selectedMIDIOutput.close();
        }
        selectedMIDIOutput = output;
    }

    function getMIDIInputs() {
        return $q(function (resolve, reject) {
            requestMIDIAccess().then(function (access) {
                console.log(access);
                resolve(access.inputs);
            }, function (error) {
                reject(error);
            });
        });
    }

    function getMIDIOutputs() {
        return $q(function (resolve, reject) {
            requestMIDIAccess().then(function (access) {
                resolve(access.outputs);
            }, function (error) {
                reject(error);
            });
        });
    }

    function requestMIDIAccess() {
        return navigator.requestMIDIAccess();
    }
});