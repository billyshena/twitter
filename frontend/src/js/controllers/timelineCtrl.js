/**
 * Created by bshen on 02/12/14.
 */

'use strict';
angular.module('app.controllers.timeline', []).controller('timelineCtrl', [
    '$scope', 'Logger', 'Auth', '$state', '$http',
    function($scope, Logger, Auth, $state, $http) {


        $scope.results = [1,2,3,4,5];

        /* Get all the tweets */
        $http
            .get(appConfig.appUrl + '/posts')
            .then(function(response){
                console.log(response);

            }, function(err){
                console.log(err);
            });




    }
]);