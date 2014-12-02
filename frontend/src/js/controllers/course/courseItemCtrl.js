/**
 * Created by bshen on 28/11/14.
 */

angular.module('app.controllers.course.modal', []).controller('courseItemCtrl', [
    '$scope', '$sailsSocket', 'Logger', 'CourseService', 'ContentService', 'ExerciseService',
    'course', 'section', '$state', '$modalInstance',
    function ($scope, $sailsSocket, Logger, CourseService, ContentService, ExerciseService,
              course, section, $state, $modalInstance) {

        /** Initialize scope values **/
        $scope.course = course;
        $scope.course.section = section;
        $scope.courseItem = {
            name: '',
            content: '',
            course: course.id,
            allowHandIns: false
        };
        $scope.dt = ''; // HandIn starting date
        $scope.dte = ''; // HandIn ending date

        $scope.clear = function () {
            $scope.dt = null;
            $scope.dte = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.openEnd = function($event){
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedEnd = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            class: 'datepicker',
            language: 'fr'
        };

        $scope.initDate = new Date();
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[3];

        $scope.cancel = function(){
            $modalInstance.dismiss();
        };

        /** Create content, exercise, qcm **/
        $scope.create = function(item){
            if(section === 'content'){
                ContentService.create(item).then(function(data){
                    $modalInstance.dismiss();
                    $state.go('app.viewCourse', { id: data.course });
                    Logger.logSuccess('Votre support a bien été ajouté à ce cours');
                }, function(err){
                    Logger.logError('Erreur lors de l\'ajout');
                    console.log(err);
                });
            }
            else if(section === 'exercise'){
                /** If start & end dates are passed, we assign them to the exercise object **/
                if(_.isDate($scope.dt) && _.isDate($scope.dte)) {
                    console.log('got there');
                    $scope.courseItem.start = $scope.dt;
                    $scope.courseItem.end = $scope.dte;
                    $scope.courseItem.allowHandIns = true;
                }
                ExerciseService.create($scope.courseItem).then(function(data){
                    $modalInstance.dismiss();
                    $state.go('app.viewCourse', { id: data.course });
                    Logger.logSuccess('Votre exercice a bien été ajouté à ce cours');
                }, function(err){
                    Logger.logError('Erreur lors de l\'ajout');
                    console.log(err);
                });
            }
            else if(section === 'qcm'){
                // TODO: Create QCM
            }
        };

    }
]);