/**
 * Created by bshen on 08/12/14.
 */
angular.module('app.directives.upload', [])
    .directive('upload', ['Storage', 'Logger',
        function (Storage, Logger) {
            return function (scope, element) {
                element.dropzone({
                    url: appConfig.appUrl + '/upload_avatar',
                    maxFilesize: 500,
                    paramName: "file",
                    maxThumbnailFilesize: 5,
                    addRemoveLinks: true,
                    dictCancelUpload: "Annuler",
                    dictRemoveFile: "Supprimer",
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(Storage.get('token')).hash
                    },
                    init: function () {

                        this.on("success", function (data, files) {
                            Logger.logSuccess('Votre avatar a bien été modifié!');
                            scope.$apply(function(){
                                scope.user = files;
                            })
                        });

                        this.on("error", function (file, err) {
                            console.log(err);
                            if (err.indexOf('File is too big') != -1) {
                                Logger.logError('Le fichier est trop lourd. (500mo maximum)')
                            }
                            else {
                                Logger.logError("Erreur lors de la mise en ligne.");
                            }
                        });
                    }
                });
            }
        }]);