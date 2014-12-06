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


        $http.post('http://192.168.1.15:3000/user', {
            account_name: 'billy',
            username: 'billy',
            password: 'billyshen',
            email: 'billy.shen',
            bio: 'iezudhizedjizedezd'
        }).success(function(data){
            console.log(data);
            console.log('entered');
        }, function(err){
            console.log(err);
        })










    }
]);