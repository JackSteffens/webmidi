angular.module('WebMIDI').controller('KeyboardCtrl', function ($scope, WebMidi, KeyboardModel) {
    $scope.sendToOutput = sendToOutput;

    $scope.velocity = 100;
    $scope.keys = [];

    function init() {

    }

    /**
     * TODO
     * @param {Array<Number>}command
     */
    function sendToOutput(command) {
        console.log('keyboardCtrl sendToOutput : ' + command);
        if ($scope.keyboardModel.output && $scope.keyboardModel.output.connection === 'open') {
            $scope.keyboardModel.output.send(command);
        } else {
            console.warn('No connected output port');
        }
    }

    init();
});