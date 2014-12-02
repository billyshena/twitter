/**
 * Created by shen on 04/06/14.
 */


angular.module('app.controllers.folder', []).controller('folderCtrl', [
    '$scope', '$modal', 'FolderService', 'FileService', 'CurrentUser', 'MimeType',
    function ($scope, $modal, FolderService, FileService, CurrentUser, MimeType) {

        $scope.images = [];
        $scope.parent = -1;
        $scope.path = [];
        $scope.pathName = [];

        // Function to create a folder
        $scope.createFolder = function() {
            FolderService.create({
                name: $scope.folder.name,
                owner: CurrentUser.getCurrentUser().id,
                parent: $scope.parent
            }).then(function(folder) {
                folder.icon = MimeType.folderIcon(folder);
                $scope.folder.name = '';
            }, function(error) {
                console.log(error)
            })
        };

        // Loading a folder
        $scope.loadFolder = function(folder) {

            /* If we have a folder object */
            if(folder && folder.id && folder.name) {
                $scope.parent = folder.id;
                $scope.pathName.push(folder.name);
            }
            /* If it's just an id */
            else if(folder) {
                $scope.parent = folder;
            }
            /* Otherwise, it's the main folder */
            else {
                $scope.pathName = ['Accueil'];
            }

            $scope.path.push($scope.parent);

            // Fetching all sub folders
            FolderService.find({
                owner: CurrentUser.getId(),
                parent: $scope.parent
            }).then(function(folders) {
                $scope.folders = folders;
                angular.forEach($scope.folders, function(value) {
                    value.icon = MimeType.folderIcon(value);
                });
                $scope.folders.sort(compareAsc);
            }, function(error) {
                console.log(error)
            });

            // Fetching all files
            FileService.find({
                owner: CurrentUser.getId(),
                folder: $scope.parent
            }).then(function(files) {
                $scope.files = files;
                angular.forEach($scope.files, function(value) {
                    value.icon = MimeType.fileIcon(value);
                    if(value.mimeType == 'image/gif' || value.mimeType == 'image/jpeg' || value.mimeType == 'image/png' || value.mimeType == 'image/pjpeg') {
                        $scope.images.push(value);
                    }
                });
                $scope.files.sort(compareAsc);
            }, function(error) {
                console.log(error)
            });
        };

        /** Function to go back to the previous Path **/
        $scope.back = function() {

            if ($scope.path.length > 1) {
                $scope.path.pop();
                $scope.pathName.pop();
                $scope.loadFolder($scope.path.pop());
            }
            else {
                $scope.loadFolder($scope.path[0]);
            }

        };


        /* Modal Part */
        $scope.open = function (modal, folder) {

            $modal.open({
                templateUrl: appConfig.assetsUrl + 'views/documents/modal/' + modal + '.html',
                controller: modal + 'Ctrl',
                resolve: {
                    folder: function() {
                        return folder;
                    },
                    folders: function() {
                        return $scope.folders;
                    }
                }
            });
        };


        /* Modal Part */
        $scope.openFile = function (modal, file) {
            $modal.open({
                templateUrl: appConfig.assetsUrl + 'views/documents/modal/' + modal + '.html',
                controller: modal + 'Ctrl',
                resolve: {
                    file: function() {
                        return file;
                    },
                    files: function() {
                        return $scope.files;
                    },
                    images: function() {
                        return $scope.images;
                    }
                }
            });
        };


        function compareAsc(a,b) {
            if (a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase())
                return 1;
            return 0;
        }

        function compareDesc(a,b) {
            if (a.name.toLowerCase() > b.name.toLowerCase())
                return -1;
            if (a.name.toLowerCase() < b.name.toLowerCase())
                return 1;
            return 0;
        }


        /* Sort function */
        $scope.sort = function(order) {
            console.log(order)
            $scope.typeSort = null;
            if(order && order == 'asc') {
                $scope.folders.sort(compareAsc);
                $scope.files.sort(compareAsc);
            }
            else if(order && order == 'image') {
                $scope.typeSort = 'image';
            }
            else if(order && order == 'video') {
                $scope.typeSort = 'video';
            }
            else if(order && order == 'audio') {
                $scope.typeSort = 'audio';
            }
            else if(order && order == 'pdf') {
                $scope.typeSort = 'application/pdf';
            }
            else {
                $scope.folders.sort(compareDesc);
                $scope.files.sort(compareDesc);
            }
        };


        $scope.loadFolder();
    }
]);