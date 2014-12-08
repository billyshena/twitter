'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    [
        '$rootScope', '$state', '$stateParams', 'Auth', 'Logger',
        function ($rootScope, $state, $stateParams, Auth, Logger) {
            $rootScope.$on("$stateChangeStart", function (event, toState) {
                if (toState.authenticate && !Auth.isAuthenticated()) {
                    event.preventDefault();
                    Logger.logError('Merci de vous connecter pour accéder à cette section');
                    $state.go('app.home');
                }
            });
        }
    ]
)
    .config(
    [
        '$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.interceptors.push('AuthInterceptor');

            // Send to login if the URL was not found
            $urlRouterProvider.otherwise("app/home");

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: appConfig.assetsUrl + 'views/app.html'
                })
                .state("app.home", {
                    url: "/home",
                    controller: 'homeCtrl',
                    templateUrl: appConfig.assetsUrl + 'views/home.html'
                })
                .state('app.timeline',{
                    url: '/timeline',
                    controller: 'timelineCtrl',
                    templateUrl: appConfig.assetsUrl + 'views/timeline.html',
                    authenticate: true
                })
                .state('app.profile',{
                    url: '/profile',
                    controller: 'userCtrl',
                    templateUrl: appConfig.assetsUrl + 'views/profile.html',
                    authenticated: true
                })

        }
    ]
);