/**
 * Created by shen on 04/06/14.
 */
/**
 * Auth service which is used to authenticate users with backend server and provide simple
 * methods to check if user is authenticated or not.
 *
 * Within successfully login process service will store user data and JWT token to local
 * storage where those are accessible in the application.
 *
 * This service provides following methods:
 *
 *  Auth.authorize(access)
 *  Auth.isAuthenticated()
 *  Auth.login(credentials)
 *  Auth.logout()
 *
 * You can use this service fairly easy on your controllers and views if you like to. It's
 * recommend that you use this service with 'CurrentUser' service in your controllers and
 * views.
 *
 * Usage example in controller:
 *
 *  angular
 *      .module('app')
 *      .controller('SomeController',
 *          [
 *              '$scope', 'Auth', 'CurrentUser',
 *              function ($scope, Auth, CurrentUser) {
 *                  $scope.auth = Auth;
 *                  $scope.user = CurrentUser.user;
 *              }
 *          ]
 *      );
 *
 * Usage example in view:
 *
 *  <div data-ng-show="auth.isAuthenticated()">
 *      Hello, <strong>{{user().email}}</strong>
 *  </div>
 *
 * Happy coding!
 *
 * @todo    Revoke method?
 * @todo    Admin right?
 */
(function() {
    'use strict';

    angular.module('app.services.auth',[])
        .factory('Auth',
        [
            '$http', 'Storage', 'Logger',
            function($http, Storage, Logger) {
                return {
                    /**
                     * Method to authorize current user with given access level in application.
                     *
                     * @param   {Number}    access  Access level to check
                     *
                     * @returns {*}
                     */
//                    authorize: function(access) {
//                        if (access === AccessLevels.user) {
//                            return this.isAuthenticated();
//                        } else {
//                            return true;
//                        }
//                    },

                    /**
                     * Method to check if current user is authenticated or not. This will just
                     * simply call 'Storage' service 'get' method and returns it results.
                     *
                     * @returns {*}
                     */
                    isAuthenticated: function() {
                        return Storage.get('token') != null;
                    },

                    /**
                     * Check if the type of the current User is an Admin one, to display the right panel
                     * @returns {*}
                     */
                    isAdmin: function(){
                        return this.isAuthenticated() && JSON.parse(Storage.get('token')).type == 96;
                    },

                    isTeacher: function(){
                        return this.isAuthenticated() && JSON.parse(Storage.get('token')).type == 89;

                    },

                    isStudent: function(){
                        return this.isAuthenticated() && JSON.parse(Storage.get('token')).type == 9;
                    },

                    /**
                     * Method make login request to backend server. Successfully response from
                     * server contains user data and JWT token as in JSON object. After successful
                     * authentication method will store user data and JWT token to local storage
                     * where those can be used.
                     *
                     * @param   {*} credentials
                     *
                     * @returns {*|Promise}
                     */
                    login: function(credentials) {
                        return $http
                            .post(appConfig.appUrl+'/auth/login', credentials, { withCredentials: true })
                            .success(function(response) {
                                if(response.token){
                                    Storage.set('token', response.token);
                                }
                                else{
                                    return response;
                                }
                            }).error(function(error){
                                return Logger.logError(error.message);
                            });
                    },

                    forgot: function(user) {
                        return $http
                            .post(appConfig.appUrl+'/auth/forgot', user)
                            .success(function(response) {
                                Logger.logSuccess('E-mail de redéfinition envoyé !');
                            }).error(function(error) {
                                Logger.logError('Utilisateur introuvable !');
                            });
                    },


                    /**
                     * The backend doesn't care about logouts, delete the token and you're good to go.
                     *
                     * Should we still make logout process to backend side?
                     */
                    logout: function() {
                        return $http
                            .post(appConfig.appUrl + '/user/onDisconnected')
                            .then(function(){
                                Storage.unset('token');
                                console.log('unset')
                            },function(err){
                                console.log(err);
                            });
                    }
                };
            }
        ]
    );
}());