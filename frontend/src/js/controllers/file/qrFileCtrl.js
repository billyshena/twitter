angular.module('app.controllers.file.qrcode', []).controller('qrFileCtrl', [
    '$scope', '$modalInstance', 'file', 'files',
    function ($scope, $modalInstance, file, files) {

        $scope.files = files;
        // http://www.qrcode.com/en/about/version.html
        $scope.data = {
            url: 'http://' + window.location.host + '/download/documents/'+file.id
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
])