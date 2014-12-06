/**
 * Created by bshen on 02/12/14.
 */
/**
 * Created by bshen on 12/11/14.
 */
/**
 * Created by shen on 05/06/14.
 */
'use strict';
angular.module('app.controllers.home', []).controller('homeCtrl', [
    '$scope', 'Logger', '$http',
    function($scope, Logger, $http) {


        $http.post('http://localhost:3000/user/create', {
            account_name: 'test_local',
            username: 'test_local',
            password: 'test',
            email: 'test@test.com',
            bio: 'test'
        }).success(function(data){
            console.log(data);
            console.log('entered');
        }, function(err){
            console.log(err);
        })










    }
]);