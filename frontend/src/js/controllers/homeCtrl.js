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
    '$scope', 'Logger', '$http', 'Auth', '$state',
    function($scope, Logger, $http, Auth, $state) {

        /* Register a new user object */
        $scope.signUp = function (user){

            console.log(user);
            $http
                .post(appConfig.appUrl + '/user/create',{
                    email: user.email,
                    new_password: user.password,
                    account_name: user.userName
                })
                .success(function(data){
                    $scope.newUser = {};
                    console.log(data);
                    Logger.logSuccess('Votre compte a bien été crée');
                }, function(err){
                    console.log(err);
                });
        };


        /* Login action */
        $scope.signIn = function(user){
            return Auth.login(user).then(function(data) {
                if(Auth.isAuthenticated()){
                    Logger.logSuccess('Vous êtes désormais connecté!');
                    window.location.href = '/';
                }
                else{
                    Logger.logError('Merci de vérifier vos identifiants');
                }
            });
        }



    }
]);