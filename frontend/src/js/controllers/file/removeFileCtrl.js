angular.module('app.controllers.file.remove', []).controller('removeFileCtrl', [
    '$scope', '$modalInstance', 'Logger', 'FileService', 'CurrentUser', 'file', 'files',
    function ($scope, $modalInstance, Logger, FileService, CurrentUser, file, files) {

        $scope.files = files;

        $scope.ok = function () {

            FileService
                .delete(file)
                .then(function () {
                    Logger.logSuccess('Fichier supprimé !');

                    var user = CurrentUser.getCurrentUser();

                    // Updating user space
                    user.usedSpace -= file.size;
                    CurrentUser.setCurrentUser(user);
                }, function (err) {
                    Logger.logError('Erreur lors de la suppression');
                    console.log(err);
                });

            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
]);