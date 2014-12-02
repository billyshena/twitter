/**
 * Created by shen on 04/06/14.
 */


angular.module('app.controllers.auth', ['satellizer']).controller('authCtrl', [
        '$scope', '$auth', '$state', 'Logger', 'Auth',
        function ($scope, $auth, $state, Logger, Auth) {

            // Function to login through FB, google or linkedin
            $scope.authenticate = function(provider) {
                $auth.authenticate(provider);
            };


            // login function
            $scope.login = function () {
                return Auth
                    .login($scope.user)
                    .then(function () {
                        if (Auth.isAuthenticated()) {
                            Logger.logSuccess('connected !');
                            $state.go('app.timeline');
                        } else {
                            // Prompt an error if credentials are invalid
                            Logger.logError('Email ou mot de passe incorrects');
                        }
                    }
                );
            };

            // Logout function
            $scope.logout = function () {
                console.log('logggout')
                Auth.logout();
                $state.go('login');
            };


        }
    ]);