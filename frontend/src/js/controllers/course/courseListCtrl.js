/**
 * Created by bshen on 27/11/14.
 */
angular.module('app.controllers.course.list', []).controller('courseListCtrl', [
    '$scope', '$sailsSocket', 'Logger', 'CourseService', 'Storage', '$modal',
    function ($scope, $sailsSocket, Logger, CourseService, Storage, $modal) {

        /** Initialize parameters **/
        $scope.courses = [];
        var userId = JSON.parse(Storage.get('token')).id;

        /** Get all the courses **/
        CourseService.find({
            populate: 'subjects',
            where: {
                owner: userId
            }
        }).then(function(data){
            _.each(data, function(course){
                count(course);
                $scope.courses.push(course);
            });
        }, function(err){
            console.log(err);
            Logger.logError('Erreur récupération des cours');
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

        /** Open modal => removeCourse **/
        $scope.remove = function(modal,course){
            var modalInstance = $modal.open({
                templateUrl: appConfig.assetsUrl + 'views/course/modal/' + modal + '.html',
                controller: modal + 'Ctrl',
                backdrop : 'static',
                resolve: {
                    course: function() {
                        return course;
                    }
                }
            });
            modalInstance.result.then(function(data){
                $scope.courses.splice($scope.courses.indexOf(data),1);
            })
        };

        /** Count & assign the number of contents,exercises & qcm attached to the course **/
        function count(course){
            $sailsSocket
                .get(appConfig.appUrl + '/course/count?id=' + course.id)
                .then(function(data){
                    _.merge(course,data);
                });
        }
    }
]);