/**
 * Created by bshen on 12/11/14.
 */
/**
 * Created by shen on 05/06/14.
 */
'use strict';
angular.module('app.controllers.timeline', []).controller('timelineCtrl', [
    '$scope', '$http',
    function($scope, $http) {


        $http.get('http://localhost:3000/home').then(function(data){
            console.log(data);
        })


    }
]);