/**
 * Created by bshen on 02/12/14.
 */

'use strict';
angular.module('app.controllers.timeline', []).controller('timelineCtrl', [
    '$scope', 'Logger', 'Auth', '$state', '$http', 'Storage',
    function($scope, Logger, Auth, $state, $http, Storage) {


        /* Initialize scope values */
        $scope.current_user = JSON.parse(Storage.get('token')).id;
        $scope.persons = [];
        $scope.posts = [];
        $scope.maxLength = 150;
        $scope.numberPosts = 0;
        $scope.numberFollowers = 0;
        $scope.numberFollowings = 0;


        /* Get all the users to be followed */
        $http
            .get(appConfig.appUrl + '/user')
            .then(function(response){
                angular.forEach(response.data, function(user){
                    $http
                        .get(appConfig.appUrl + '/user/is_following/' + user.id)
                        .then(function(response){
                            user.is_following = response.data.is_following;
                            console.log("follow = " + user.is_following);
                            $scope.persons.push(user);
                        }, function(err){
                            console.log(err);
                        })
                });
            }, function(err){
                console.log(err);
            });

        /* Get all the tweets */
        $http
            .get(appConfig.appUrl + '/posts')
            .then(function(response){
                console.log(response.data);
                $scope.posts = response.data;
            }, function(err){
                console.log(err);
                Logger.logError('Erreur récupération de vos postes');
            });

        /* Count the user's tweets */
        $http
            .get(appConfig.appUrl + '/count/posts')
            .then(function(response){
                $scope.numberPosts = response.data;
            }, function(err){
                console.log(err);
            });

        $scope.follow = function(user){
            $http.post(appConfig.appUrl + '/relationships/create',{
                followed_id: user.id
            }).then(function(data){
                console.log(data);
                $scope.persons.splice($scope.persons.indexOf(data),1);
                Logger.logSuccess('Vous venez de suivre ' + user.account_name);
            }, function(err){
                return;
            });
        };


        $scope.unfollow = function(user){
            $http.post(appConfig.appUrl + '/relationships/destroy',{
                followed_id: user.id
            }).then(function(data){
                console.log(data);
                user.is_following = false;
                return;
            }, function(err){
                console.log(err);
            });
        };

        /** get number of followers for the current user **/
        $http
            .get(appConfig.appUrl + '/user/' + $scope.current_user + '/followers')
            .then(function(response){
                $scope.numberFollowers = response.data.length;
            }, function(err){

            });

        /* get number of followings for the current user */
        $http
            .get(appConfig.appUrl + '/user/' + $scope.current_user + '/following')
            .then(function(response){
                $scope.numberFollowings = response.data.length;
            }, function(err){
                console.log(err);
            });



    }
]).directive('uploadPicture', ['Storage', 'Logger', '$http',
    function (Storage, Logger, $http) {
        return function (scope, element) {
            element.dropzone({
                url: appConfig.appUrl + '/posts/new',
                maxFilesize: 500,
                paramName: "file",
                maxThumbnailFilesize: 5,
                addRemoveLinks: true,
                autoProcessQueue: false,
                dictCancelUpload: "Annuler",
                dictRemoveFile: "Supprimer",
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(Storage.get('token')).hash
                },
                init: function () {
                    var submitButton = document.querySelector("#tweetB");
                    var myDropzone = this; // closure

                    submitButton.addEventListener("click", function() {
                        myDropzone.processQueue(); // Tell Dropzone to process all queued files.
                        if(myDropzone.files.length === 0){
                            $http.post(appConfig.appUrl + '/posts/new_post',{
                                content: scope.post.content
                            }).then(function(response){
                                scope.post.content = '';
                                scope.posts.push(response.data);
                                Logger.logSuccess('Votre poste a bien été publié');
                            }, function(err){
                                console.log(err);
                            });
                        }
                    });


                    this.on("success", function (data, files) {
                        scope.$apply(function(){
                            scope.posts.push(files);
                            scope.isOpen = false;
                        });
                        Logger.logSuccess('Votre poste a bien été publié');
                    });

                    this.on("complete", function () {
                        if (this.getQueuedFiles().length === 0 && this.getUploadingFiles().length === 0) {
                            myDropzone.removeAllFiles();
                        }
                    });

                    this.on("error", function (file, err) {
                        console.log(err);
                        if (err.indexOf('File is too big') != -1) {
                            Logger.logError('Le fichier est trop lourd. (500mo maximum)')
                        }
                        else {
                            Logger.logError("Erreur lors de la mise en ligne.");
                        }
                    });
                }
            });
        }
    }]);