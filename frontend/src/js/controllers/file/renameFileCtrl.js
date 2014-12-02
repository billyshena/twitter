angular.module('app.controllers.file.rename', []).controller('renameFileCtrl', [
    '$scope', '$modalInstance', 'Logger', 'FileService', 'file', 'MimeType',
    function ($scope, $modalInstance, Logger, FileService, file, MimeType) {

        $scope.data = {
            newFileName: file.name
        };

        var newFileName = file.name;

        $scope.$watch('data.newFileName', function() {
            newFileName = $scope.data.newFileName;
            console.log(newFileName);
        });

        $scope.ok = function () {

            if($scope.data.newFileName === '') {
                return Logger.logWarning('Veuillez entrer un nom de fichier valide.')
            }

            file.name = $scope.data.newFileName;

            // Just pass the owner id when updating
            if(file.owner.id) {
                file.owner = file.owner.id;
            }


            FileService.update(file.id, {
                    name: file.name
                })
                .then(function(response) {
                    file.icon = MimeType.fileIcon(file);
                    $modalInstance.close();
                    Logger.logSuccess('Fichier renommé !');
                }, function(err) {
                    Logger.logError('erreeeeur');
                    console.log(err);
                });

            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
])