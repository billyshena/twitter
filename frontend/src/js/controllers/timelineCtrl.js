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
        $scope.post = {
            content: ''
        };


        /* Get all the tweets */
        $http
            .get(appConfig.appUrl + '/posts')
            .then(function(response){
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
            $http
                .post(appConfig.appUrl + '/posts/new', post)
                .then(function(response){
                    $scope.isOpen = false;
                    $scope.posts.push(response.data);
                    Logger.logSuccess('Votre tweet a bien été posté');
                }, function(err){
                    console.log(err);
                    Logger.logError('Erreur lors de la publication');
                });


            var myDropzone = new Dropzone("#my-dropzone");
            myDropzone.autoDiscover = false;

        }

    }
]).directive('uploadPicture', ['Storage', 'Logger',
    function (Storage, Logger) {
        return function (scope, element) {
            element.dropzone({
                url: appConfig.appUrl + '/file/upload',
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

                    this.on("success", function (data, files) {
                        console.log(files);
                        Logger.logSuccess('Upload avatar en cours...');
                        setTimeout(function(){
                            location.reload();
                        },3000);
                    });

                    this.on("complete", function () {
                        if (this.getQueuedFiles().length === 0 && this.getUploadingFiles().length === 0) {
                            setTimeout(function(){
                                this.removeAllFiles();
                            },3000);
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