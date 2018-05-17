angular.module('WebMIDI').controller('LoginCtrl', function ($scope, WebMidi) {
    $scope.loginTitle = 'This is the login title';
    $scope.MIDIInput = WebMidi.getSelectedMIDIInput();
    $scope.MIDIOutput = WebMidi.getSelectedMIDIOutput();
});