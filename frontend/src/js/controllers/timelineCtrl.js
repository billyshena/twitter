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


        $http
            .get(appConfig.appUrl + '/user/' + $scope.current_user)
            .then(function(response){
                $scope.user = response.data;
            }, function(err){
                console.log(err);
            });



        /* Get all the users to be followed */
        $http
            .get(appConfig.appUrl + '/user')
            .then(function(response){
                angular.forEach(response.data, function(user, index){
                    $http
                        .get(appConfig.appUrl + '/user/is_following/' + user.id)
                        .then(function(response){
                            user.is_following = response.data.is_following;
                            if(user.id !== $scope.current_user){
                                $scope.persons.push(user);
                            }
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

                angular.forEach(response.data, function(post){
                    $http
                        .get(appConfig.appUrl + '/is_favorite/'+post.id)
                        .then(function(res){
                            if(res.data.length > 0){
                                post.is_favorite = true;
                            }
                            $scope.posts.push(post);
                        })
                });
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


        $scope.favorite = function(tweet){
            $http
                .post(appConfig.appUrl + '/favorites/create',{
                    post_id: tweet.id,
                    user_id: tweet.user_id
                })
                .then(function(data){
                    tweet.is_favorite = true;
                    Logger.logSuccess("Ajouté à vos favoris");
                }, function(err){
                    console.log(err);
                });
        };


        $scope.unfavorite = function(tweet){
            $http
                .delete(appConfig.appUrl + '/favorites/' + tweet.id)
                .then(function(data){
                    tweet.is_favorite = false;
                }, function(err){
                    console.log(err);
                })
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