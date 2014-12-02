/**
 * Created by bshen on 01/12/14.
 */

angular.module('app.controllers.course.remove', []).controller('removeCourseCtrl', [
    '$scope', '$sailsSocket', 'Logger', 'course', 'CourseService', '$modalInstance',
    function ($scope, $sailsSocket, Logger, course, CourseService, $modalInstance) {

        $scope.course = course;

        /** Delete a course according to the ID **/
        $scope.remove = function(){
            CourseService.delete({
                id: course.id
            }).then(function(){
                $modalInstance.close(course);
                Logger.logSuccess('Le cours a bien été supprimé');
            },function(err){
                console.log(err);
                Logger.logError('Erreur lors de la suppression du cours');
            });
        };

        $scope.cancel = function(){ return $modalInstance.dismiss(); }
    }
]);