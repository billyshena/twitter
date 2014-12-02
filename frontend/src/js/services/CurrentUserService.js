/**
 * Created by shen on 05/06/14.
 */
/**
 * Current user data service within this you can access to currently signed in user data.
 * Note that if you wanna be secure about this you have to also use 'Auth' service in your
 * views.
 *
 * Usage example in controller:
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
 *  <div data-ng-show="auth.isAuthenticated()">
 *      Hello, <strong>{{user().email}}</strong>
 *  </div>
 *
 * Happy coding!
 */

angular.module('app.services.currentuser', [])
    .service('CurrentUser', [
        'Storage',
        function (Storage) {

            var currentUser = false;

            function _getCurrentUser() {
                return currentUser;
            }

            function _setCurrentUser(userDataObj) {
                currentUser = userDataObj;
            }

            function _unsetCurrentUser() {
                currentUser = false;
            }

            function _hasUser() {
                return !!currentUser;
            }

            return {
                getCurrentUser: function () {
                    return _getCurrentUser();
                },
                setCurrentUser: function (userDataObj) {
                    _setCurrentUser(userDataObj);
                },
                unsetCurrentUser: function () {
                    _unsetCurrentUser();
                },
                hasUser: function () {
                    return _hasUser();
                },
                getId: function() {
                    return JSON.parse(Storage.get('token')).id;
                },
                getSchool: function() {
                    return JSON.parse(Storage.get('token')).school;
                }
            }
    }]);