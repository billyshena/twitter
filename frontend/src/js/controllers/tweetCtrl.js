/**
 * Created by bshen on 03/12/14.
 */

'use strict';
angular.module('app.controllers.tweet', []).controller('tweetCtrl', [
    '$scope', 'Logger',
    function($scope, Logger) {

        console.log('tweetCtrl fired');

        $scope.maxLength = 150;



    }
]);