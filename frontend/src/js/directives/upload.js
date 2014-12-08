/**
 * Created by bshen on 08/12/14.
 */
angular.module('app.directives.upload', [])
    .directive('upload', ['Storage', 'Logger',
        function (Storage, Logger) {
            return function (scope, element) {
                element.dropzone({
                    url: appConfig.appUrl + '/file/upload',
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
                            console.log(files);
                            Logger.logSuccess('Upload avatar en cours...');
                            setTimeout(function(){
                                location.reload();
                            },3000);
                        });

                        this.on("complete", function () {
                            if (this.getQueuedFiles().length === 0 && this.getUploadingFiles().length === 0) {
                                setTimeout(function(){
                                    this.removeAllFiles();
                                },3000);
                            }
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