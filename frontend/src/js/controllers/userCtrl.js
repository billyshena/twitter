angular.module('app.controllers.user', []).controller('userCtrl', [
    '$scope', '$http', 'Logger', '$modal',
    function ($scope, $http, Logger, $modal) {



        $scope.open = function(modal){
            var modalInstance = $modal.open({
                templateUrl: appConfig.assetsUrl + 'views/modals/' + modal + '.html',
                controller: modal + 'Ctrl'
            });
        };


    }
]);