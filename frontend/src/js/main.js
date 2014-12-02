'use strict';

/* Controllers */

angular.module('app.controllers.main',[]).controller('AppCtrl', [
    '$scope', '$window', '$sailsSocket', 'Auth', 'Storage', 'CurrentUser', 'TeamRequestService', 'TeamService',
    function ($scope, $window, $sailsSocket, Auth, Storage, CurrentUser, TeamRequestService, TeamService) {


        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

        // config
        $scope.app = {
            name: 'Scoledge',
            version: '1.3.3',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                assetsUrl: 'http://localhost:8080/',
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: true,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        };

        /** Functions triggered when the User is logged in **/
        if(Auth.isAuthenticated()) {

            $sailsSocket
                .get(appConfig.appUrl + '/user/' + CurrentUser.getId())
                .then(function (response) {

                    // Setting current user
                    CurrentUser.setCurrentUser(response.data);
                    $scope.user = response.data;

                    // Loading team request
                    TeamRequestService.find({
                        where: {
                            user: CurrentUser.getId(),
                            state: 'pending'
                        },
                        populate: ['team', 'from']
                    }).then(function(data) {
                        $scope.teamRequests = data;
                        console.log(data);
                    }, function(err) {
                        console.log(err);
                    });

                }, function (err) {
                    console.log(err);
                });

            /** Whenever onConnect triggers, make the user join the room again **/
            $sailsSocket.subscribe('onConnect',function(data){
                return $sailsSocket.get(appConfig.appUrl + '/user/joinRoom');
            });


            $sailsSocket.subscribe('newEvent',function(data){
                console.log('HEYHEY');
                console.log(data);
            });


            // Function to accept team request
            $scope.acceptRequest = function(teamRequest) {

                console.log(teamRequest);

                TeamService
                    .addUser(teamRequest.team, CurrentUser.getCurrentUser())
                    .then(function(response) {

                        // Updating the team request object
                        TeamRequestService
                            .update(teamRequest.id, {
                                state: 'accepted'
                            }).then(function(response) {
                                $scope.teamRequests.splice($scope.teamRequests.indexOf(response.data), 1);
                            }, function(err) {
                                console.log(err);
                            });

                    }, function(err) {
                        console.log(err);
                    });
            };

            // Function to decline team request
            $scope.declineRequest = function(teamRequest) {

                console.log(teamRequest);

                TeamRequestService
                    .update(teamRequest.id, {
                        state: 'declined'
                    }).then(function(response) {
                        console.log(response)
                        $scope.teamRequests.splice($scope.teamRequests.indexOf(response.data), 1);
                    }, function(err) {
                        console.log(err);
                    });
            }
        }

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

    }]);