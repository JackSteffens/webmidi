'use strict';
angular.module('WebMIDI').controller('MainCtrl', function ($scope, $state, $q, WebMidi, OutputPort, Key, Command, KeyboardModel) {
    $scope.login = login;
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

    function login() {
        $state.go('login', $scope.username);
    }

    function createVirtualKeyboard(minKey, maxKey) {
        virtualOutputPort = new OutputPort(true, {id: 'virtualID', name: 'virtualName'});
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
            console.log('lastCommand updated!');
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
        if (hasValidOutput()) {
            var keys = [];
            if ($scope.minKey && $scope.maxKey) {
                for (var keyNumber = $scope.minKey; keyNumber <= $scope.maxKey; keyNumber++) {
                    keys.push(new Key(keyNumber));
                }
            }
            $scope.keyboardModel = new KeyboardModel($scope.midiSelectedOutput, keys);
        } else {
            throw new Error('No output to bind keyboard to');
        }
    }

    function hasValidOutput() {
        return ($scope.midiSelectedOutput && $scope.midiSelectedOutput.connection && $scope.midiSelectedOutput.connection === 'open');
    }


    function sendVirtual(command) {
        console.log('sending ' + command + ' to virtual keyboard');
        virtualOutputPort.send(command);
    }

    function resetKeys() {
        $scope.minKey = null;
        $scope.maxKey = null;
        $scope.keys = [];
    }

    function selectPort(port) {
        console.log('selecting a port');
        port.open().then(function (midiPort) {
            if (midiPort instanceof MIDIInput) {
                $scope.midiSelectedInput = midiPort;
                WebMidi.setSelectedMIDIInput(midiPort);
                midiPort.onmidimessage = function (note) {
                    console.log('Received note from input ' + midiPort.name);
                    console.log(note);
                    $scope.lastCommand = Array.from(note.data);
                    $scope.$applyAsync();
                };
            } else if (midiPort instanceof MIDIOutput) {
                $scope.midiSelectedOutput = midiPort;
                WebMidi.setSelectedMIDIOutput(midiPort)
            } else {
                console.error('Not a MIDIPort');
            }
            console.log(port);
            $scope.$applyAsync();
            console.log('Successfully opened port for ' + midiPort.constructor.name + ' | ' + midiPort.id);
        }, function (error) {
            console.error(error);
        });
    }

    init();
});