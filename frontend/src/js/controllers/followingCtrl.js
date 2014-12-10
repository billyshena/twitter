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
            .get(appConfig.appUrl + '/user/' + $scope.current_user + '/followers')
            .then(function(response){
                angular.forEach(response.data, function(user, index){
                    $http
                        .get(appConfig.appUrl + '/user/is_following/' + user.id)
                        .then(function(response){
                            user.is_following = response.data.is_following;
                            if(user.id !== $scope.current_user){
                                $scope.users.push(user);
                            }
                        }, function(err){
                            console.log(err);
                        })
                });
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


        $scope.follow = function(user){
            $http.post(appConfig.appUrl + '/relationships/create',{
                followed_id: user.id
            }).then(function(data){
                $scope.numberFollowings += 1;
                user.is_following = true;
                Logger.logSuccess('Vous venez de suivre ' + user.account_name);
            }, function(err){
                return;
            });
        };


        $scope.unfollow = function(user){
            $http.delete(appConfig.appUrl + '/relationships/'+ user.id).then(function(data){
                $scope.numberFollowings -= 1;
                user.is_following = false;
                return;
            }, function(err){
                console.log(err);
            });
        };


    }
]);