angular.module('app.controllers.folder.properties', []).controller('propertiesFolderCtrl', [
    '$scope', '$modalInstance', 'FolderService', 'folder',
    function ($scope, $modalInstance, FolderService, folder) {

        $scope.folder = folder;

        FolderService
            .count({
                where: {
                    parent: folder.id
                }
            })
            .then(function(data) {
                $scope.folder.nbFolders = data.count;
            });

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
])