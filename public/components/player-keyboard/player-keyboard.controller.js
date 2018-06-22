'use strict';
angular.module('WebMIDI').controller('PlayerKeyboardCtrl', function ($scope, $state, PlayerKeyboardService) {
    $scope.keyboard = null;
    $scope.show = false;

    function initWatcher() {
        $scope.$watch(
            PlayerKeyboardService.getKeyboard,
            function (newKeyboard, oldKeyboard) {
                if (!angular.equals(newKeyboard, oldKeyboard)) {
                    $scope.keyboard = newKeyboard;
                }
            });

        $scope.$watch(function () {
            return $state.current.name;
        }, function (newState) {
            $scope.show = (newState && newState !== 'login');
        });
    }

    this.$onInit = function () {
        initWatcher();
    }
});