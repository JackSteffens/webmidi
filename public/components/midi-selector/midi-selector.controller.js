'use strict';
angular.module('WebMIDI').controller('MidiSelectorCtrl', function ($scope, $q, WebMidi, MockMIDIOutput) {
    $scope.open = open;
    $scope.virtualOutput = new MockMIDIOutput('ID', 'NAME', angular.noop());

    /**
     *
     * @param {MIDIInput|MIDIOutput|MockMIDIOutput}port
     */
    function open(port) {
        console.log('doShit()' + port.id);
        $scope.selectPort(port);
    }
});