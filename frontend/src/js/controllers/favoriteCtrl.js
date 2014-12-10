/**
 * Created by shen on 04/06/14.
 */


angular.module('app.controllers.favorite', []).controller('favoriteCtrl', [
    '$scope', '$state', 'Logger', 'data', '$http',
    function ($scope, $state, Logger, data, $http) {
        console.log(data);


        $scope.posts = [];
        $scope.numberFavorites = 0;

        $http
            .get(appConfig.appUrl + '/getFavorites/' + data.id)
            .then(function(response){
                $scope.posts = response.data;
                $scope.numberFavorites = response.data.length;
            }, function(err){
                Logger.logError('Erreur récupération des favoris');
                console.log(err);
            });

    }
]);