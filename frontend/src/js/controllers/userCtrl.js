angular.module('app.controllers.user', []).controller('userCtrl', [
    '$scope', '$http', 'Logger', '$modal', 'data', 'Storage',
    function ($scope, $http, Logger, $modal, data, Storage) {

        /* Initialize scope values here */
        $scope.user = data;
        $scope.currentUser = JSON.parse(Storage.get('token')).id;
        $scope.posts = [];


        $http
            .get(appConfig.appUrl + '/user/is_following/' + $scope.user.id)
            .then(function(response){
                $scope.user.is_following = response.data.is_following;
            }, function(err){
                console.log(err);
            });

        $scope.open = function(modal){
            var modalInstance = $modal.open({
                templateUrl: appConfig.assetsUrl + 'views/modals/' + modal + '.html',
                controller: modal + 'Ctrl'
            });
        };


        /* Get user's posts */
        $http
            .get(appConfig.appUrl + '/userPosts/' + data.id)
            .then(function(response){
                $scope.posts = response.data;
            }, function(err){
                console.log(err);
                Logger.logError('Erreur récupération de vos postes');
            });


        /** get number of followers for the current user **/
        $http
            .get(appConfig.appUrl + '/user/' + $scope.user.id + '/followers')
            .then(function(response){
                $scope.numberFollowers = response.data.length;
            }, function(err){
                console.log(err);
            });

        /* get number of followings for the current user */
        $http
            .get(appConfig.appUrl + '/user/' + $scope.user.id + '/following')
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