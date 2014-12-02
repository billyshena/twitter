/**
 * Created by bshen on 30/11/14.
 */
angular.module('app.services.exercise', [])
    .service('ExerciseService',
    ['$sailsSocket', 'BaseModel',
        function ($sailsSocket, BaseModel) {

            var endpoint = 'exercise';

            // Get model
            var model = angular.copy(BaseModel);

            model.setEndpoint(endpoint);

            return model;
        }
    ]);