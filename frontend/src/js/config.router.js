'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    [
        '$rootScope', '$state', '$stateParams', '$sailsSocket', 'Auth', 'CurrentUser', 'Storage',
        function ($rootScope, $state, $stateParams, $sailsSocket, Auth, CurrentUser, Storage) {

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)
    .config(
    [
        '$stateProvider', '$urlRouterProvider', '$authProvider', '$httpProvider', '$sailsSocketProvider',
        function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $sailsSocketProvider) {


            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $httpProvider.interceptors.push('AuthInterceptor');
            $sailsSocketProvider.interceptors.push('AuthInterceptor');



            $authProvider.tokenPrefix = ''; // Local Storage name prefix

            /* Satellizer config */
            $authProvider.facebook({
                url: appConfig.appUrl + '/auth/facebook',
                clientId: '672332782803862'
            });


            // Send to login if the URL was not found
            $urlRouterProvider.otherwise("/app/timeline");


            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: appConfig.assetsUrl + 'views/app.html'
                })
                .state("app.timeline", {
                    url: "/timeline",
                    controller: 'timelineCtrl',
                    templateUrl: appConfig.assetsUrl + 'views/timeline/index.html',
                    authenticate: true
                })
                .state('login', {
                    url: '/login',
                    templateUrl: appConfig.assetsUrl + 'views/auth/login.html',
                    controller: 'authCtrl',
                    authenticate: false
                })
                .state('home', {
                    url: '/home',
                    templateUrl: appConfig.assetsUrl + 'views/home/index.html',
                    controller: 'homeCtrl'
                })
                .state('validate', {
                    url: '/validate/:id',
                    templateUrl: appConfig.assetsUrl + 'views/validate/start.html',
                    controller: 'validateCtrl',
                    resolve: {
                        school: [
                            '$stateParams', '$sailsSocket', 'Logger',
                            function($stateParams, $sailsSocket, Logger){
                                return $sailsSocket.get(appConfig.appUrl + '/school/' + $stateParams.id)
                                    .then(function(response) {
                                        return response.data;
                                    },function(err) {
                                        Logger.logError('Impossible de charger l\'école.')
                                    });
                            }
                        ]
                    }
                })
                .state('register', {
                    url: '/register/:hash',
                    templateUrl: appConfig.assetsUrl + 'views/register/index.html',
                    controller: 'registerCtrl',
                    resolve: {
                        token: [
                            '$stateParams',
                            function($stateParams) {
                                return $stateParams.hash;
                            }
                        ]
                    }
                })
                .state('app.profile',{
                    url: '/profile',
                    templateUrl: appConfig.assetsUrl + 'views/user/profileUser.html'
                })
                .state('app.documents',{
                    url: '/documents',
                    templateUrl: appConfig.assetsUrl + 'views/documents/index.html',
                    controller: 'folderCtrl'
                })
                .state('app.preview',{
                    url: '/file/preview/:id',
                    templateUrl: appConfig.assetsUrl + 'views/documents/preview.html',
                    controller: 'pdfPreviewCtrl',
                    authenticate: true,
                    resolve: {
                        data: [
                            '$stateParams','$sailsSocket',
                            function($stateParams){
                                return $stateParams.id;
                            }
                        ]
                    }
                })
                .state('app.newCourse',{
                    url: '/course/new',
                    templateUrl: appConfig.assetsUrl + 'views/course/new.html',
                    controller: 'courseCtrl'
                })
                .state('app.teams',{
                    url: '/teams',
                    templateUrl: appConfig.assetsUrl + 'views/team/index.html',
                    controller: 'teamCtrl'
                })
                .state('app.newTeam',{
                    url : '/team/new',
                    templateUrl: appConfig.assetsUrl + 'views/team/new.html',
                    controller: 'newTeamCtrl'
                })
                .state('app.viewTeam',{
                    url : '/team/view/:id',
                    templateUrl: appConfig.assetsUrl + 'views/team/view.html',
                    controller: 'viewTeamCtrl',
                    resolve: {
                        team: [
                            '$stateParams', 'TeamService',
                            function($stateParams, TeamService) {
                                return TeamService.findOne($stateParams.id, {
                                    populate: ['users', 'teachers', 'teams', 'events']
                                }).then(function(data) {
                                    return data;
                                }, function(err) {
                                    console.log(err);
                                });
                            }
                        ]
                    }
                })
                .state('app.courses',{
                    url: '/courses',
                    templateUrl: appConfig.assetsUrl + 'views/course/index.html',
                    controller: 'courseListCtrl'
                })
                .state('app.viewCourse',{
                    url: '/course/:id',
                    templateUrl: appConfig.assetsUrl + 'views/course/view.html',
                    controller: 'viewCourseCtrl',
                    resolve: {
                        data: [
                            '$stateParams', 'CourseService', 'Logger', '$state',
                            function($stateParams, CourseService, Logger, $state){
                                return CourseService.find({
                                    id: $stateParams.id
                                }).then(function(course){
                                    return course;
                                }, function(err){
                                    $state.go('app.timeline');
                                    Logger.logError('Ce cours n\'existe plus');
                                });
                            }
                        ]
                    }
                })
                .state('app.viewItem',{
                    url: '/course/:courseId/:section/:id',
                    templateUrl: appConfig.assetsUrl + 'views/course/item.html',
                    controller: 'viewCourseItemCtrl',
                    resolve: {
                        data: [
                            '$stateParams', 'Logger', 'ContentService', 'ExerciseService', '$state',
                            function($stateParams, Logger, ContentService, ExerciseService, $state){
                                if($stateParams.section === 'content'){
                                    return ContentService.find({
                                        id: parseInt($stateParams.id, 10)
                                    }).then(function(data){
                                        return data;
                                    }, function(err){
                                        Logger.logError('Ce support n\'existe plus');
                                        $state.go('app.timeline');
                                    })
                                }
                                else if($stateParams.section === 'exercise'){
                                    return ExerciseService.find({
                                        id: parseInt($stateParams.id, 10)
                                    }).then(function(data){
                                        return data;
                                    }, function(err){
                                        Logger.logError('Cet exercice n\'existe plus');
                                        $state.go('app.timeline');
                                    })
                                }
                                else{
                                    return $state.go('app.timeline');
                                }
                            }
                        ]
                    }
                })
        }
    ]
);