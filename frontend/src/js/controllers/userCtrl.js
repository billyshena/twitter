angular.module('app.controllers.user', []).controller('userCtrl', [
    '$scope', '$http', 'Logger', '$modal', 'data',
    function ($scope, $http, Logger, $modal, data) {


        /* Initialize scope values here */
        $scope.user = data;

        $scope.open = function(modal){
            var modalInstance = $modal.open({
                templateUrl: appConfig.assetsUrl + 'views/modals/' + modal + '.html',
                controller: modal + 'Ctrl'
            });
        };




    }
]);