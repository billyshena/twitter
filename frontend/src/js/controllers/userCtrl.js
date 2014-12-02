angular.module('app.controllers.user', []).controller('userCtrl', [
    '$scope', '$rootScope', 'MimeType', 'CurrentUser', '$stateParams', 'data', '$sailsSocket', 'Logger', '$state', 'Storage', '$sce',
    function ($scope, $rootScope, MimeType, CurrentUser, $stateParams, data, $sailsSocket, Logger, $state, Storage, $sce) {

        $scope.user = data;

        $scope.edit = {
            password: false
        };

        $scope.getUserProfile = function() {
            return $sce.trustAsResourceUrl($scope.assetsUrl + 'views/user/profileUser.html');
        }

        $scope.getProfileOther = function() {
            return $sce.trustAsResourceUrl($scope.assetsUrl + 'views/user/profileOther.html');
        }


        $scope.isOwner = function () {
            return CurrentUser.user().id == $stateParams.id;
        };

        // If we are on someone else's profile page, we load the sharebox
        if (!$scope.isOwner()) {

            $scope.parent = -1;
            $scope.owner = CurrentUser.user().id;
            $scope.path = new Array();

            $scope.back = function () {
                if ($scope.path.length > 1) {
                    $scope.path.pop();
                    $scope.pathName.pop();
                    $scope.loadFolder($scope.path.pop());
                }
                else {
                    $scope.loadFolder($scope.path[0]);
                }

            };

            $scope.download = function (file) {
                var token = Storage.get('token');
                window.location = appConfig.appUrl + '/sharebox/download?file=' + file.id + '&token=' + token;
            };

            $scope.loadFolder = function (folder) {

                /* If we have a folder object */
                if (folder && folder.id && folder.name) {
                    $scope.parent = folder.id;
                    $scope.pathName.push(folder.name);
                }
                /* If it's just an id */
                else if (folder) {
                    $scope.parent = folder;
                }
                /* Otherwise, it's the main folder */
                else {
                    $scope.pathName = new Array('Accueil');
                }

                $scope.path.push($scope.parent);

                console.log("parent = " + $scope.parent);
                // Fetch all the folders
                $sailsSocket
                    .get(appConfig.appUrl + '/sharebox?parent=' + $scope.parent + '&user=' + $stateParams.id + '')
                    .success(function (data) {
                        var folders = data.folders;
                        angular.forEach(folders, function (value, key) {
                            value.icon = MimeType.folderIcon(value);
                        });
                        var files = data.files;
                        var images = new Array();
                        angular.forEach(files, function (value, key) {
                            value.icon = MimeType.fileIcon(value);
                            if (value.mimeType == 'image/gif' || value.mimeType == 'image/jpeg' || value.mimeType == 'image/png' || value.mimeType == 'image/pjpeg') {
                                images.push(value);
                            }
                        });
                        $scope.folders = folders;
                        $scope.files = files;
                        $scope.images = images;

                    })
                    .error(function (err) {
                        console.log('ok');
                        console.log(err);
                    });
            };

            // Loading the main folder
            $scope.loadFolder();
        }


        $scope.edit = function (user) {
            $scope.editedUser = user;
        };

        $scope.editAvatar = function (user) {
            $scope.editedAvatar = user;
        };

        $scope.revert = function () {
            $scope.user = CurrentUser.user();
        };

        $scope.revertAvatar = function () {
            $scope.editedAvatar = null;
        };

        /** Function to edit personal information **/
        $scope.doneEditing = function (user) {
            var userToEdit = {
                firstName: user.firstName,
                lastName: user.lastName,
                postalAddress: user.postalAddress,
                phone: user.phone,
                facebook: user.facebook,
                twitter: user.twitter
            };
            $sailsSocket.put(appConfig.appUrl + '/user/' + CurrentUser.user().id, userToEdit)
                .success(function (data) {
                    $scope.user = data;
                    //$rootScope.user = user;
                    Logger.logSuccess('Profil mis à jour');
                    CurrentUser.setUser(data);
                })
                .error(function (data) {
                    // TODO : Afficher la bonne erreur
                    Logger.logError('Champs invalide');
                })

        };


        /** Function to edit user's own password **/
        $scope.doneEditingMDP = function (mdp) {
            var user = CurrentUser.user();

            console.log(user);

            $sailsSocket
                .post(appConfig.appUrl + '/user/updatePassword', {
                    password: mdp.former,
                    newPassword1: mdp.new,
                    newPassword2: mdp.new2,
                    id: user.id
                }
            )
                .success(function (data) {
                    Logger.logSuccess('Mot de passe modifié !');
                    $scope.edit.password = false;
                    mdp.former = '';
                    mdp.new = '';
                    mdp.new2 = '';
                })
                .error(function (data) {
                    Logger.logError('Erreur lors de la modification du mot de passe.');
                })
        };

        $scope.canSubmit = function () {
            return $scope.form_mdp.$valid;
        };

        $scope.isDifferent = function (mdp) {
            return mdp.new == mdp.new2;
        };

    }
])
    .directive('avatar', ['Storage', 'Logger', 'CurrentUser',
        function (Storage, Logger, CurrentUser) {
            return function (scope, element, $rootScope) {
                element.dropzone({
                    url: appConfig.appUrl + '/user/updateAvatar',
                    maxFilesize: 2,
                    paramName: "file",
                    dictCancelUpload: "Annuler",
                    dictRemoveFile: "Supprimer",
                    maxThumbnailFilesize: 1,
                    headers: { 'Authorization': 'Bearer ' + Storage.get('token') },
                    init: function () {
                        this.on('success', function (file, json) {
                            var user = scope.user;
                            user.avatar = json.avatar;
                            Logger.logSuccess('Votre photo de profil a bien été mise à jour !');
                            CurrentUser.setUser(user);
                            scope.user = user;
                            setTimeout(function(){
                                location.reload();
                            },2000);
                        });
                        this.on('error', function (file, err) {
                            Logger.logError('Erreur lors de la mise en ligne de l\'avatar.');
                            this.removeAllFiles();
                        });
                    }
                });
            }
        }
    ]);