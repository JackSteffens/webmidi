'use strict';
angular.module('WebMIDI').controller('SetupCtrl', function ($rootScope, $scope, $state, $q, WebMidi, MockMIDIOutput, Key, Command, KeyboardModel, PlayerKeyboardService) {
    $scope.selectPort = selectPort;
    $scope.resetKeys = resetKeys;
    $scope.createVirtualKeyboard = createVirtualKeyboard;
    $scope.sendVirtual = sendVirtual;
    var virtualOutputPort = null;

    $scope.midiInputs = [];
    $scope.midiOutputs = [];
    $scope.lastCommand = [];
    $scope.minKey = null;
    $scope.maxKey = null;
    $scope.keys = [];
    $scope.keyboardModel = null;

    function createVirtualKeyboard(minKey, maxKey) {
        virtualOutputPort = new MockMIDIOutput('virtual id', 'virtual name', angular.noop());
        $scope.minKey = minKey;
        $scope.maxKey = maxKey;
        renderKeyboard();
    }

    function init() {
        var promises = {
            inputs: WebMidi.getMIDIInputs(),
            outputs: WebMidi.getMIDIOutputs()
        };

        $q.all(promises)
            .then(function (midi) {
                midi.inputs.forEach(function (input, id) {
                    $scope.midiInputs.push(input);
                });

                midi.outputs.forEach(function (output, id) {
                    $scope.midiOutputs.push(output);
                });
            }, function (error) {
                console.error(error);
            });

        $scope.$watch('lastCommand', function (newCommand) {
            if (newCommand) {
                if (newCommand[0] === 144) {
                    if (newCommand[1] < $scope.minKey || $scope.minKey === null) {
                        $scope.minKey = newCommand[1];
                        renderKeyboard();
                    } else if (newCommand[1] > $scope.maxKey || $scope.maxKey === null) {
                        $scope.maxKey = newCommand[1];
                        renderKeyboard();
                    }
                }
            }
        }, true);
    }

    function renderKeyboard() {
        if (hasValidSelectedOutput()) {
            $scope.keys = [];
            if ($scope.minKey && $scope.maxKey) {
                for (var keyNumber = $scope.minKey; keyNumber <= $scope.maxKey; keyNumber++) {
                    $scope.keys.push(new Key(keyNumber));
                }
            }
            $scope.keyboardModel = new KeyboardModel($scope.midiSelectedInput, $scope.midiSelectedOutput, $scope.keys);
            PlayerKeyboardService.setKeyboard($scope.keyboardModel);
        } else {
            throw new Error('No output to bind keyboard to');
        }
    }

    function hasValidSelectedOutput() {
        return ($scope.midiSelectedOutput && $scope.midiSelectedOutput.connection && $scope.midiSelectedOutput.connection === 'open');
    }


    function sendVirtual(command) {
        console.log('sending ' + command + ' to virtual keyboard');
        virtualOutputPort.send(command);
    }

    function resetKeys() {
        $scope.minKey = null;
        $scope.maxKey = null;
        renderKeyboard();
    }

    /**
     * TODO MOVE TO MIDI SERVICE
     * @param port
     */
    function selectPort(port) {
        port.open().then(function (midiPort) {
            if (isValidInput(midiPort)) {
                $scope.midiSelectedInput = midiPort;
                WebMidi.setSelectedMIDIInput(midiPort);
                midiPort.onmidimessage = function (note) {
                    $scope.lastCommand = Array.from(note.data);
                    $rootScope.$broadcast('keyevent', note);
                    $scope.$applyAsync();
                };
            } else if (isValidOutput(midiPort)) {
                $scope.midiSelectedOutput = midiPort;
                WebMidi.setSelectedMIDIOutput(midiPort);
            } else {
                console.error('Not a MIDIPort');
            }

            if (hasValidSelectedOutput()) {
                renderKeyboard();
            }

            $scope.$applyAsync();
            console.log('Successfully opened port for ' + midiPort.constructor.name + ' | ' + midiPort.id);
        }, function (error) {
            console.error(error);
        });
    }

    function isValidInput(midiPort) {
        return (midiPort instanceof MIDIInput && midiPort !== $scope.midiSelectedInput);
    }

    function isValidOutput(midiPort) {
        return ((midiPort instanceof MIDIOutput || midiPort instanceof MockMIDIOutput) && midiPort !== $scope.midiSelectedOutput);
    }

    init();
});