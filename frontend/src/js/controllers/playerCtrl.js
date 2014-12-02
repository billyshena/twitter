angular.module('app.player', []).controller('playerCtrl', [
    '$scope','AudioService',
    function($scope, AudioService) {

        // instead of setTimeout(function(){audioService.setPlayer($scope.audio1);}, 1000);
        $scope.$watch('player', function() {
            AudioService.setPlayer($scope.player);
        });

        $scope.next = function(autoplay) {
            AudioService.next(autoplay);
        };

    }
])
