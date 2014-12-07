/**
 * Created by bshen on 02/12/14.
 */

'use strict';
angular.module('app.controllers.timeline', []).controller('timelineCtrl', [
    '$scope', 'Logger', 'Auth', '$state', '$http',
    function($scope, Logger, Auth, $state, $http) {

        console.log('timelineCtrl fired');

        $http.get(appConfig.appUrl + '/user').then(function(response){
            console.log(response);
        }, function(err){
            console.log(err);
        })
    }
]);