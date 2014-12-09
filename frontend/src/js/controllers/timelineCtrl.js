/**
 * Created by bshen on 02/12/14.
 */

'use strict';
angular.module('app.controllers.timeline', []).controller('timelineCtrl', [
    '$scope', 'Logger', 'Auth', '$state', '$http',
    function($scope, Logger, Auth, $state, $http) {


        /* Initialize scope values */
        $scope.results = [1,2,3,4,5];
        $scope.posts = [];
        $scope.maxLength = 150;
        $scope.numberPosts = 0;


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

        $http
            .get(appConfig.appUrl + '/count/posts')
            .then(function(response){
                $scope.numberPosts = response.data;
            }, function(err){
                console.log(err);
            });


        /* Create a new Post */
        $scope.create = function(post){
            /* Create a new Post */
/*            $http
                .post(appConfig.appUrl + '/posts/new', post)
                .then(function(response){
                    $scope.isOpen = false;
                    $scope.posts.push(response.data);
                    Logger.logSuccess('Votre tweet a bien été posté');
                }, function(err){
                    console.log(err);
                    Logger.logError('Erreur lors de la publication');
                });*/



            Dropzone.autoDiscover = false;

            // console.log(angular.element(document.querySelector("#my-dropzone")));

        }

    }
]).directive('uploadPicture', ['Storage', 'Logger',
    function (Storage, Logger) {
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