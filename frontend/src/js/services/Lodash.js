/**
 * Created by guillaume on 17/11/2014.
 */
/**
 * Angular service to inject lo-dash library to your controllers.
 *
 * Usage example in controller:
 *
 *  angular
 *      .module('app')
 *      .controller('SomeController',
 *          [
 *              '$scope', '_',
 *              function ($scope, _) {
 *                  var foo = _.map(data, function(foo) { return foo.bar = 'foobar'; });
 *              }
 *          ]
 *      );
 *
 * With this you can use lo-dash library easily in your controllers.
 */
(function() {
    'use strict';

    angular.module('app.services.lodash', [])
        .factory('_',
        [
            '$window',
            function service($window) {
                return $window._;
            }
        ]
    );
}());