/**
 * Created by bshen on 09/12/14.
 */
angular.module('app.controllers.follower', []).controller('followerCtrl', [
    '$scope', '$http', 'Logger', 'Storage',
    function ($scope, $http, Logger, Storage) {

        /* Initialize scope values */
        $scope.current_user = JSON.parse(Storage.get('token')).id;
        $scope.users = [];


        /* Get current user */
        $http
            .get(appConfig.appUrl + '/user/' + $scope.current_user)
            .then(function(response){
                $scope.user = response.data;
            }, function(err){
                console.log(err);
            });
        
        /* Get the following users */
        $http
            .get(appConfig.appUrl + '/user/' + $scope.current_user + '/followers')
            .then(function(response){
                $scope.users = response.data;
            }, function(err){
                console.log(err);
            });
    }
]);