angular.module('WebMIDI').controller('MainCtrl', function ($scope, $state, $q, WebMidi) {
    $scope.login = login;
    $scope.selectPort = selectPort;

    $scope.midiInputs = [];
    $scope.midiOutputs = [];

    function login() {
        $state.go('login', $scope.username);
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
    }

    function selectPort(port) {
        port.open().then(function (midiPort) {
            if (midiPort instanceof MIDIInput) {
                WebMidi.setSelectedMIDIInput(midiPort);
                midiPort.onmidimessage = function (note) {
                    console.log('Received note from input ' + midiPort.id);
                    console.log(note);
                }
            } else if (midiPort instanceof MIDIOutput) {
                WebMidi.setSelectedMIDIOutput(midiPort)
            }
            $scope.$apply();
            console.log('Successfully opened port for ' + midiPort.constructor.name + ' | ' + midiPort.id);
        }, function (error) {
            console.error(error);
        });
    }

    init();
});