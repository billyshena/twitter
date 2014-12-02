angular.module('app.controllers.file.picture', ['angular-carousel']).controller('pictureFileCtrl', [
    '$scope', '$modalInstance', '$sailsSocket', 'Storage', 'file', 'images',
    function ($scope, $modalInstance, $sailsSocket, Storage, file, images) {

        $scope.images = images;
        $scope.selected = file;

        // Searching image index
        for(var i=0; i<images.length; i++) {
            if(file.id == images[i].id) {
                $scope.slideIndex = i;
                break;
            }
        }

        $scope.token =  JSON.parse(Storage.get('token')).hash;
        $scope.appUrl = appConfig.appUrl;

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
])