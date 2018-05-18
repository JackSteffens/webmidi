angular.module('WebMIDI').directive('keyboard', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'components/keyboard/keyboard.html',
        controller: 'KeyboardCtrl',
        scope: {
            keyboardModel: '='
        }
    }
});