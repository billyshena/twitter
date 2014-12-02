/**
 * Created by shen on 04/06/14.
 */


angular.module('app.controllers.file', []).controller('fileCtrl', [
    '$scope', '$state', '$rootScope', 'Storage', 'AudioService',
    function ($scope, $state, $rootScope, Storage, AudioService) {

        var token = JSON.parse(Storage.get('token')).hash;

        /** Function to download a File **/
        $scope.download = function(file) {
            window.location = appConfig.appUrl + '/download/documents/' + file.id + '/' + token;
        };

        /** Preview feature **/
        $scope.preview = function(file) {
            if(file.mimeType == 'application/pdf') {
                $state.go('app.preview', {id: file.id});
            }
            if(file.mimeType == 'image/gif' || file.mimeType == 'image/jpeg' || file.mimeType == 'image/png' || file.mimeType == 'image/pjpeg') {
                $scope.openFile('pictureFile', file);
            }
            if(file.mimeType.indexOf('video') != -1) {
                $scope.openFile('videoFile', file);
            }
            if(file.mimeType.indexOf('audio') != -1) {
                var url = appConfig.appUrl + '/download/documents/' + file.id + '/' + token;
                AudioService.play(url, file.mimeType);
                $rootScope.title = file.name;
            }

        };


        $scope.addToPlaylist = function(file) {
            var url = appConfig.appUrl + '/download/documents/' + file.id + '/' + token;
            AudioService.addToPlaylist(url, file.mimeType);
        };



    }
]);