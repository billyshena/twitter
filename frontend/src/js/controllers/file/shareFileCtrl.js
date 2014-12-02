angular.module('app.controllers.file.share', [])    .controller('shareFileCtrl', [
    '$scope', '$modalInstance', '$sailsSocket', 'Logger', 'file', 'files', 'UserService', 'CurrentUser',
    function ($scope, $modalInstance, $sailsSocket, Logger, file, files, UserService, CurrentUser) {

        $scope.selectedPersons = [];
        $scope.files = files;
        $scope.file = file;
        $scope.data = {
            term: ''
        };

        // Fetching all teams
        UserService
            .findOne(CurrentUser.getId()).then(function(user) {
                $scope.teams = user.teams;
                console.log(teams);
            }, function(err) {
                console.log(err);
                Logger.logError('Erreur lors de la récupération des groupes.')
            });


        /** Get the people with whom the File is shared with **/
        $sailsSocket
            .get(appConfig.appUrl + '/file/'+file.id + '?populate=users')
            .success(function(file){
                $scope.sharedPersons = file.users;
                console.log($scope.sharedPersons);
            })
            .error(function(err){
                Logger.logError('Impossible de récupérer les personnes du partage');
            });

        $scope.ok = function (permission,fileId,teamId) {
            var users = [];
            file.permission = permission || $scope.file.permission.id;
            // Just pass the owner id when updating
            if(file.owner.id) {
                file.owner = file.owner.id;
            }
            if(teamId && teamId > 0){
                file.permission = teamId;
            }

            $modalInstance.close();

            /** Update File permission **/
            $sailsSocket
                .put(appConfig.appUrl + '/file/' + fileId , file)
                .success(function(data){
                    /** If permission is a Team **/
                    if(teamId) {
                        $sailsSocket
                            .get(appConfig.appUrl + '/team/' + teamId + '?populate=[users,teachers]')
                            .success(function (team) {
                                var results = []; // Array of user ids
                                users = team.users.concat(team.teachers);
                                angular.forEach(users, function (user) {
                                    results.push(user.id);
                                });
                                $sailsSocket
                                    .post(appConfig.appUrl +'/file/sendNotification',{ file: data.id, users: results })
                                    .success(function(){
                                        Logger.logSuccess('Votre fichier a bien été partagé à la classe ' + team.name);
                                    })
                                    .error(function(err){
                                        console.log(err);
                                        Logger.logError('UNe erreur est survenue lors du partage');
                                    });
                            })
                            .error(function (err) {
                                Logger.logError('Impossible de récupérer la classe');
                            });
                    }
                    else if(permission == 'public' || permission == 'private'){
                        console.log('file.id ' + file.id)
                        /** Remove all previous associations **/

                        $sailsSocket
                            .put(appConfig.appUrl + '/file/' + file.id, {
                                users: []
                            })
                            .success(function(){
                                Logger.logSuccess('Votre fichier a bien été partagé');

                            })
                            .error(function(err){
                                Logger.logError('Erreur suppression des personnes du partage');
                            })
                    }
                    else {
                        Logger.logSuccess('Modifications effectuées');
                    }
                })
                .error(function(err){
                    Logger.logError('Erreur lors du partage du fichier');
                });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        /** Function fired whenever a selection is done **/
        $scope.selectPerson = function(id){
            var index = $scope.selectedPersons.indexOf(id);
            return (index == -1) ? $scope.selectedPersons.push(parseInt(id,10)) : $scope.selectedPersons.splice(index,1);
        };

        $scope.isChecked = function(id){
            if($scope.selectedPersons.indexOf(id) == -1){
                return true;
            }
            return false;
        };


        /* Autocomplete **/
        $scope.$watch('data.term',function(){
            if($scope.data.term.length > 2){
                $sailsSocket
                    .get(appConfig.appUrl + '/user?where={"or":[{"firstName":{"contains":"' + $scope.data.term + '"}},{"lastName":{"contains":"'+ $scope.data.term +'"}}]}')
                    .success(function(data) {
                        $scope.results = data;
                    })
                    .error(function(err) {
                        Logger.logError('Aucun utilisateur récupéré.');
                    });
            }
        });

        /** Function fired when the user choose to share the File with other people **/
        $scope.share = function(file) {
            /** If file is already being shared with a Team **/
            if($scope.selectedPersons.length > 0){
                /** Add the selected user array into the File object relationship with User **/
                $sailsSocket
                    .put(appConfig.appUrl + '/file/' + file.id, {permission: 'users' })
                    .success(function(){
                        file.permission = 'users';

                        $sailsSocket
                            .post(appConfig.appUrl + '/file/sendNotification',{
                                users: $scope.selectedPersons,
                                file: file.id
                            })
                            .success(function(){
                                Logger.logSuccess('Votre partage a été effectué');
                                $modalInstance.dismiss('cancel');
                            })
                            .error(function(err){
                                console.log(err);
                                Logger.logError('Une erreur est survenue lors du partage');
                            });
                    })
                    .error(function(err){
                        Logger.logError('Erreur lors du partage avec les utilisateurs');
                    })
            }
            else {
                $modalInstance.dismiss('cancel');
            }
        };

        /** Delete a File association in user.sharedFiles **/
        $scope.removeShare = function(fileId,user){
            $sailsSocket
                .delete(appConfig.appUrl +'/user/'+user.id + '/sharedFiles/' + fileId )
                .success(function(){
                    Logger.logSuccess(user.firstName + '  ' + user.lastName + ' a été supprimé du partage');
                    $scope.sharedPersons.splice($scope.sharedPersons.indexOf(user),1);
                })
                .error(function(err){
                    console.log(err);
                    Logger.logError('Erreur suppression de la personne du partage');
                });
        }
    }
])