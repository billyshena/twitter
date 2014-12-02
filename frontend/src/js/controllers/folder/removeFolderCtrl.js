angular.module('app.controllers.folder.remove', []).controller('removeFolderCtrl', [
    '$scope', '$modalInstance', 'Logger', 'FolderService', 'folder', 'folders',
    function ($scope, $modalInstance, Logger, FolderService, folder, folders) {

        $scope.folders = folders;

        $scope.remove = function () {
            FolderService
                .delete(folder)
                .then(function() {
                    $modalInstance.close();
                    Logger.logSuccess('Dossier supprimé !');
                })
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
]);