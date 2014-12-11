/**
 * Created by bshen on 08/12/14.
 */

'use strict';
angular.module('app.controllers.avatar', []).controller('avatarCtrl', [
    '$scope', 'Logger', 'Auth', '$state', '$http', '$modalInstance',
    function($scope, Logger, Auth, $state, $http, $modalInstance) {

        $scope.close = function(){
            $modalInstance.dismiss();
        };

        $scope.$watch('user',function(data){
            if(data){
                $modalInstance.close(data);
            }
        });

    }
]);