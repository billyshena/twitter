angular.module('app.controllers.folder.share', []).controller('shareFolderCtrl', [
    '$scope', '$modalInstance', 'Logger', 'folder', 'FolderService',
    function ($scope, $modalInstance, Logger, folder, FolderService) {

        /** Initialize scope values here **/
        $scope.folder = folder;

        /** Share Folder in public or private **/
        $scope.sharePublicOrPrivate = function(permission,folder){
            FolderService
                .update(parseInt(folder.id,10),{
                    permission: permission === 'public' ? 'public' : 'private',
                    users: []
                })
                .then(function(response){
                    folder.permission = response.data.permission;
                    $modalInstance.dismiss();
                    return Logger.logSuccess("Modification bien effectuée");
                },
                function(err){
                    console.log(err);
                    return Logger.logError('Erreur modification de la permission');
                });
        }
    }
]);