/**
 * Created by bshen on 02/12/14.
 */
'use strict';

/* Controllers */

angular.module('app.controllers.main',[]).controller('AppCtrl', [
    '$scope', '$window', '$modal',
    function ($scope, $window, $modal) {


        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

        // config
        $scope.app = {
            name: 'Scoledge',
            version: '1.3.3',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                assetsUrl: 'http://localhost:8080/',
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: true,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        };

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }


        $scope.open = function(modal){
            var modalInstance = $modal.open({
                templateUrl: appConfig.assetsUrl + 'views/modals/' + modal + '.html',
                controller: modal + 'Ctrl'
            });
        }

    }]);