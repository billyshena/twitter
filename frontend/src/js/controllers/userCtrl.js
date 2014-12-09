angular.module('app.controllers.user', []).controller('userCtrl', [
    '$scope', '$http', 'Logger', '$modal', 'data',
    function ($scope, $http, Logger, $modal, data) {


        /* Initialize scope values here */
        $scope.user = data;
        $scope.posts = [];

        $scope.open = function(modal){
            var modalInstance = $modal.open({
                templateUrl: appConfig.assetsUrl + 'views/modals/' + modal + '.html',
                controller: modal + 'Ctrl'
            });
        };

        $http
            .get(appConfig.appUrl + '/userPosts/' + data.id)
            .then(function(response){
                console.log(response);
                $scope.posts = response.data;
            }, function(err){
                console.log(err);
                Logger.logError('Erreur récupération de vos postes');
            });

    }
]);