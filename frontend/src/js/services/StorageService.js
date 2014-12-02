/**
 * Created by shen on 04/06/14.
 */


/**
 * Simple storage service which uses browser localStorage service to store
 * application data. Main usage of this is to store user data and JWT token
 * to browser.
 */
angular.module('app.services.storage', [])
    .factory('Storage', function () {
        return {
            get: function (key) {
                return localStorage.getItem(key);
            },
            set: function (key, val) {
                return localStorage.setItem(key, val);
            },
            unset: function (key) {
                return localStorage.removeItem(key);
            }
        };
    });
