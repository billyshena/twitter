/**
 * Created by bshen on 09/12/14.
 */
angular.module('app.controllers.follower', []).controller('followerCtrl', [
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


        /** get number of followers for the current user **/
        $http
            .get(appConfig.appUrl + '/user/' + $scope.current_user + '/followers')
            .then(function(response){
                $scope.numberFollowers = response.data.length;
            }, function(err){
                console.log(err);
            });

        /* get number of followings for the current user */
        $http
            .get(appConfig.appUrl + '/user/' + $scope.current_user + '/following')
            .then(function(response){
                $scope.numberFollowings = response.data.length;
            }, function(err){
                console.log(err);
            });



        $scope.unfollow = function(user){
            $http.delete(appConfig.appUrl + '/relationships/'+ user.id).then(function(data){
                $scope.numberFollowings -= 1;
                $scope.users.splice($scope.users.indexOf(user),1);
                return;
            }, function(err){
                console.log(err);
            });
        };
    }
]);