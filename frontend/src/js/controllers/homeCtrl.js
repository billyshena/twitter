/**
 * Created by shen on 04/06/14.
 */


angular.module('app.controllers.home', []).controller('homeCtrl', [
    '$scope', '$sailsSocket', 'Logger', 'SchoolService', 'UserService',
    function ($scope, $sailsSocket, Logger, SchoolService, UserService) {

        // Loading all schools
        SchoolService.find({
            where: {
                id: 1
            }
        }, false).then(
            function(objects) {
                $scope.schools = objects;
            }, function(error) {
                console.log(error);
                Logger.logError("Impossible de récupérer les écoles.");
            }
        );


    }
]);