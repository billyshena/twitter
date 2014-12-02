angular.module('app.controllers.folder.rename', []).controller('renameFolderCtrl', [
    '$scope', '$modalInstance', 'FolderService', 'Logger', 'MimeType', 'folder',
    function ($scope, $modalInstance, FolderService, Logger, MimeType, folder) {

        var newFolderName;

        $scope.data = {
            newFolderName: folder.name
        };

        $scope.$watch('data.newFolderName', function() {
            newFolderName = $scope.data.newFolderName;
        });

        /** PUBLIC / PRIVATE OR TEAM **/
        $scope.ok = function () {

            if($scope.data.newFolderName === '') {
                return Logger.logWarning('Veuillez entrer un nom de dossier valide.')
            }

            folder.name = $scope.data.newFolderName;

            FolderService.update(folder.id, {
                    name: folder.name
                })
                .then(function(response) {
                    folder.icon = MimeType.folderIcon(folder);
                    $modalInstance.close();
                    Logger.logSuccess('Dossier renommé !');
                }, function(err) {
                    Logger.logError('erreeeeur');
                    console.log(err);
                });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
])