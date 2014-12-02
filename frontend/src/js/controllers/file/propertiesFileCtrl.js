
angular.module('app.controllers.file.properties', []).controller('propertiesFileCtrl', [
    '$scope', '$modalInstance', 'file',
    function ($scope, $modalInstance, file) {

        $scope.file = file;

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
])