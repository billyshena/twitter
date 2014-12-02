/**
 * Created by bshen on 28/11/14.
 */

angular.module('app.controllers.course.view', []).controller('viewCourseCtrl', [
    '$scope', '$sailsSocket', 'Logger', 'CourseService', 'ContentService', 'ExerciseService', 'data', '$modal',
    function ($scope, $sailsSocket, Logger, CourseService, ContentService, ExerciseService, data, $modal) {

        /* Initialize scope values */
        $scope.course = data;

        /** Find all the Contents attached to the course **/
        ContentService.find({
            course: data.id
        }).then(function(contents){
            $scope.contents = contents;
        }, function(err){
            console.log(err);
        });

        /** Find all the Exercises attached to the course **/
        ExerciseService.find({
            course: data.id
        }).then(function(exercises){
            $scope.exercises = exercises;
        }, function(err){
            console.log(err);
        });


        /** Open modal => Add content, exercise, QCM **/
        $scope.open = function(modal, course, section){
            $modal.open({
                templateUrl: appConfig.assetsUrl + 'views/course/modal/' + modal + '.html',
                controller: modal + 'Ctrl',
                backdrop : 'static',
                resolve: {
                    course: function() {
                        return course;
                    },
                    section: function() {
                        return section;
                    }
                }
            });
        };

        /** Find all the QCM attached to the course **/
        // TODO: 1) Create QcmService , 2) .find() like above + scope attachments

    }
]);