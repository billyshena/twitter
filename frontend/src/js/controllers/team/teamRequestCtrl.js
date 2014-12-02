/**
 * Created by bshen on 26/11/14.
 */

angular.module('app.controllers.team.request', []).controller('teamRequestCtrl', [
    '$scope', '$sailsSocket', 'Logger', 'TeamRequestService', 'CurrentUser',
    function ($scope, $sailsSocket, Logger, TeamRequestService, CurrentUser) {
        //console.log(CurrentUser.getCurrentUser());


        /*TeamService.find({
            where: {
                owner: CurrentUser.getCurrentUser().id
            },
            populate: ['users', 'teachers', 'teams']
        }).then(function(data) {
            console.log(data);
            $scope.teams = data;
        }, function(err) {
            console.log(err);
        })*/



    }
]);