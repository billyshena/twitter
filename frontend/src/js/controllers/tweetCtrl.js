/**
 * Created by bshen on 03/12/14.
 */

'use strict';
angular.module('app.controllers.tweet', []).controller('tweetCtrl', [
    '$scope', 'Logger', '$http',
    function($scope, Logger, $http) {

        console.log('tweetCtrl fired');

        $scope.maxLength = 150;

        /* Create a new Post */
        $scope.create = function(post){
            console.log(post);

            /* Create a new Post */
            $http
                .post(appConfig.appUrl + '/posts/new', post)
                .then(function(data){
                    console.log(data);

                }, function(err){
                    console.log(err);
                });

        }



    }
]);