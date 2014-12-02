/**
 * Created by bshen on 26/11/14.
 */

angular.module('app.controllers.team', []).controller('teamCtrl', [
    '$scope', '$sailsSocket', 'Logger', 'TeamService', 'UserService', 'CurrentUser',
    function ($scope, $sailsSocket, Logger, TeamService, UserService, CurrentUser) {

        $scope.teams = [];

        // Teams we joined
        UserService.findOne(CurrentUser.getId(), {
            populate: ['teams']
        }).then(function(data) {
            console.log(data);
            $scope.teams = $scope.teams.concat(data.teams);
        }, function(err) {
            console.log(err);
        })

        // Teams we have created
        TeamService.find({
            where: {
                owner: CurrentUser.getId()
            },
            populate: ['users', 'teachers', 'teams']
        }).then(function(data) {
            //console.log(data);
            $scope.teams = $scope.teams.concat(data);
        }, function(err) {
            console.log(err);
        })



    }
]);