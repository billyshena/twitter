angular.module('app.controllers.register', ['satellizer'])
    .controller('registerCtrl', [
        '$scope', '$sailsSocket', '$state', '$auth', 'token', 'Logger',
        function ($scope, $sailsSocket, $state, $auth, token, Logger) {


            // Checking if there is the validation token
            if(token !== '') {
                $sailsSocket
                    .get(appConfig.appUrl + '/token?where={"hash": "' + token + '"}')
                    .then(function(response) {
                        if(response.data[0]) {
                            $scope.token = response.data[0];
                        }
                    }, function(err) {
                        $scope.token = false;
                    })
            }
            else {
                $state.go('home');
            }

            // Satellizer authenticate function (FB, twitter, google)
            $scope.authenticate = function(provider) {
                $auth.authenticate(provider, {
                    validationToken: token
                });
            };


            // Function to create the user account
            $scope.createAccount = function() {
                $sailsSocket
                    .post(appConfig.appUrl + '/user', {
                        firstName: $scope.user.firstName,
                        lastName: $scope.user.lastName,
                        email: $scope.email,
                        password: $scope.user.password,
                        validationToken: $scope.token.hash
                    })
                    .then(function(response) {

                        // TODO: set user id in stored token

                        Logger.logSuccess('Compte crée !');
                        $state.go('home');
                    }, function(err) {
                        console.log(err);
                        Logger.logError('Impossible de créer le compte.');
                    });
            }

        }
]);