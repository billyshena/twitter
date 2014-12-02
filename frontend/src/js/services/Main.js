/**
 * Created by bshen on 13/11/14.
 */
angular.module('app.controllers', [])
    .controller('appCtrl', [
        '$scope','$sce',
        function ($scope,$sce) {
            $scope.assetsUrl = appConfig.assetsUrl;

            $scope.getHeader = function() {
                return $sce.trustAsResourceUrl($scope.assetsUrl + 'views/header.html');
            };

            $scope.getStudentPanel = function() {
                return $sce.trustAsResourceUrl($scope.assetsUrl + 'views/panel/studentPanel.html');
            };

            $scope.getTeacherPanel = function() {
                return $sce.trustAsResourceUrl($scope.assetsUrl + 'views/panel/teacherPanel.html');
            };

            $scope.getAdminPanel = function() {
                return $sce.trustAsResourceUrl($scope.assetsUrl + 'views/panel/adminPanel.html');
            };



        }
    ]);
