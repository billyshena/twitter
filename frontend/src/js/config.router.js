'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    [
        '$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)
    .config(
    [
        '$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];


            // Send to login if the URL was not found
            $urlRouterProvider.otherwise("/app/timeline");

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: appConfig.assetsUrl + 'views/app.html'
                })
                .state("app.home", {
                    url: "/home",
                    controller: 'homeCtrl',
                    templateUrl: appConfig.assetsUrl + 'views/timeline/index.html'
                })

        }
    ]
);