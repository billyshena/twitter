angular.module('app.controllers.user', []).controller('userCtrl', [
    '$scope', '$http', 'Logger', '$modal', 'data', 'Storage',
    function ($scope, $http, Logger, $modal, data, Storage) {


        /* Initialize scope values here */
        $scope.user = data;
        $scope.currentUser = JSON.parse(Storage.get('token')).id;
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
                $scope.posts = response.data;
            }, function(err){
                console.log(err);
                Logger.logError('Erreur récupération de vos postes');
            });

    }
]);