/**
 * Created by bshen on 09/12/14.
 */
angular.module('app.controllers.following', []).controller('followingCtrl', [
    '$scope', '$http', 'Logger', 'Storage', 'data',
    function ($scope, $http, Logger, Storage, data) {

        /* Initialize scope values */
        $scope.current_user = JSON.parse(Storage.get('token')).id;
        $scope.users = [];
        $scope.user = data;



        /* Get the following users */
        $http
            .get(appConfig.appUrl + '/user/' + $scope.current_user + '/following')
            .then(function(response){
                $scope.users = response.data;
            }, function(err){
                console.log(err);
            });

    }
]);