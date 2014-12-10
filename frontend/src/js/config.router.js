'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    [
        '$rootScope', '$state', '$stateParams', 'Auth', 'Logger', 'amMoment',
        function ($rootScope, $state, $stateParams, Auth, Logger, amMoment) {
            amMoment.changeLocale('fr');
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
            $urlRouterProvider.otherwise("app/timeline");

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
                    url: '/profile/:name',
                    controller: 'userCtrl',
                    templateUrl: appConfig.assetsUrl + 'views/profile.html',
                    authenticate: true,
                    resolve: {
                        data: [
                            '$stateParams','$http', 'Logger', '$state',
                            function($stateParams, $http, Logger, $state){
                                return $http
                                    .get(appConfig.appUrl + '/user/get/' + $stateParams.name)
                                    .then(function(response){
                                        return response.data[0];
                                    }, function(err){
                                        console.log(err);
                                        Logger.logError('Cet utilisateur n\'existe pas');
                                        $state.go('app.timeline');
                                    })
                            }
                        ]
                    }
                })
                .state('app.following',{
                    url: '/following/:name',
                    controller: 'followingCtrl',
                    templateUrl: appConfig.assetsUrl + 'views/following.html',
                    authenticate: true,
                    resolve: {
                        data: [
                            '$stateParams','$http', 'Logger', '$state',
                            function($stateParams, $http, Logger, $state){
                                return $http
                                    .get(appConfig.appUrl + '/user/get/' + $stateParams.name)
                                    .then(function(response){
                                        return response.data[0];
                                    }, function(err){
                                        console.log(err);
                                        Logger.logError('Cet utilisateur n\'existe pas');
                                        $state.go('app.timeline');
                                    })
                            }
                        ]
                    }
                })
                .state('app.followers',{
                    url: '/followers/:name',
                    controller: 'followerCtrl',
                    templateUrl: appConfig.assetsUrl + 'views/followers.html',
                    authenticate: true,
                    resolve: {
                        data: [
                            '$stateParams','$http', 'Logger', '$state',
                            function($stateParams, $http, Logger, $state){
                                return $http
                                    .get(appConfig.appUrl + '/user/get/' + $stateParams.name)
                                    .then(function(response){
                                        return response.data[0];
                                    }, function(err){
                                        console.log(err);
                                        Logger.logError('Cet utilisateur n\'existe pas');
                                        $state.go('app.timeline');
                                    })
                            }
                        ]
                    }
                })
                .state('app.favorites',{
                    url: '/favorites/:id',
                    controller: 'favoriteCtrl',
                    templateUrl: appConfig.assetsUrl + 'views/favorites.html',
                    authenticate: true,
                    resolve: {
                        data: [
                            '$stateParams','$http', 'Logger', '$state',
                            function($stateParams, $http, Logger, $state){
                                return $http
                                    .get(appConfig.appUrl + '/user/' + $stateParams.id)
                                    .then(function(response){
                                        return response.data;
                                    }, function(err){
                                        console.log(err);
                                        Logger.logError('Cet utilisateur n\'existe pas');
                                        $state.go('app.timeline');
                                    })
                            }
                        ]
                    }
                })

        }
    ]
);