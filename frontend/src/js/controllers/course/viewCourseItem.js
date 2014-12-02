/**
 * Created by bshen on 30/11/14.
 */


angular.module('app.controllers.course.viewItem', []).controller('viewCourseItemCtrl', [
    '$scope', '$sailsSocket', 'Logger', 'data', 'CourseService', '$stateParams', 'ContentService', 'ExerciseService',
    function ($scope, $sailsSocket, Logger, data, CourseService, $stateParams, ContentService, ExerciseService) {

        /* Initialize scope values */
        $scope.courseItem = data;
        $scope.section = $stateParams.section;
        var editItem = {};

        /* Fetch the owner of the course and assign it to the courseItem */
        CourseService.find({
            populate: 'owner',
            id: data.course
        }).then(function(data){
            $scope.owner = data.owner;
        }, function(err){
            console.log(err);
        });


        /* Update courseItem */
        $scope.update = function(item){
            if($scope.section === 'content'){
                ContentService
                    .update(item.id, item)
                    .then(function(data){
                        Logger.logSuccess('Modifications effectuées');
                        $scope.show = false;
                        $scope.edit = false;
                    }, function(err){
                        console.log(err);
                    });
            }
            else if($scope.section === 'exercise'){
                ExerciseService
                    .update(item.id, item)
                    .then(function(data){
                        Logger.logSuccess('Modifications effectuées');
                        $scope.show = false;
                        $scope.edit = false;
                    }, function(err){
                        console.log(err);
                    });
            }
            else{
                return Logger.logError('La section est introuvable');
            }
        }

    }
]);