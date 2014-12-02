angular.module('app.directives.file.upload', [])
    .directive('upload', ['Storage', 'Logger', 'MimeType', 'CurrentUser',
        function (Storage, Logger, MimeType, CurrentUser) {

            console.log('uploadDirective');

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
                            angular.forEach(files, function (item) {

                                console.log(item);
                                item.icon = MimeType.fileIcon(item);

                                // Updating user's space
                                scope.user.usedSpace += item.size;
                                var user = CurrentUser.getCurrentUser();
                                user.usedSpace += item.size;
                                CurrentUser.setCurrentUser(user);

                                if (scope.files) {
                                    scope.$apply(function () {
                                        scope.files.push(item);

                                        /* If it's a picture, adding it to $scope.images */
                                        if (item.mimeType == 'image/gif' || item.mimeType == 'image/jpeg' || item.mimeType == 'image/png' || item.mimeType == 'image/pjpeg') {
                                            scope.images.push(item);
                                        }
                                    })
                                }
                                else {
                                    scope.$apply(function () {
                                        scope.files = new Array(item);
                                    })
                                }
                                Logger.logSuccess('Fichier mis en ligne !');
                            });
                        });

                        this.on("complete", function () {
                            if (this.getQueuedFiles().length === 0 && this.getUploadingFiles().length === 0) {
                                this.removeAllFiles();
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
        }])