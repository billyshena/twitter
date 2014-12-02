/**
 * Created by bshen on 20/11/14.
 */
'use strict';

describe('homeCtrl', function() {
    // Load the module with MainController
    beforeEach(module('app'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function($controller, $rootScope, $httpBackend,$http) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('homeCtrl', {
                $scope: scope
        });
    }));

    it('should create $scope.schools and $scope.schools.length should be > 0',
        function() {
            expect(scope.schools).toBeUndefined();
        });


});

