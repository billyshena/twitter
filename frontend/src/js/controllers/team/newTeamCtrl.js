/**
 * Created by bshen on 26/11/14.
 */
/**
 * Created by bshen on 26/11/14.
 */

angular.module('app.controllers.team.new', []).controller('newTeamCtrl', [
    '$scope', '$sailsSocket', '$state', 'Logger', 'UserService', 'TeamService',
    function ($scope, $sailsSocket, $state, Logger, UserService, TeamService) {

        /* Initialize scope values */
        $scope.team = {
            name: '',
            googleAgenda: '',
            students: [],
            teachers: []
        };

        /* Fetch students or teachers according to the keyword */
        $scope.loadUsers = function(query, type){
            return UserService.find({
                where: {
                    fullName: {
                        contains: query
                    },
                    type: parseInt(type,10)
                }
            }).then(function(data){
               return data;
            }, function(err){
               console.log(err);
            });
        };

        /* Function to create a new team */
        $scope.newTeam = function() {

            if($scope.team.name.length < 2) {
                return Logger.logError('Veuillez saisir un nom à 2 caractères au moins.');
            }

            console.log($scope.team.students);


            return TeamService.create({
                name: $scope.team.name,
                googleAgenda: $scope.team.googleAgenda,
                users: $scope.team.students.concat($scope.team.teachers)
            }).then(function(data) {

                /* Team created, sending requests now */



                Logger.logSuccess('Groupe crée !');
                $state.go('app.teams');
            }, function(err) {
                console.log(err);
                Logger.logError('Impossible de crée le groupe.');
            })
        }


    }
]);