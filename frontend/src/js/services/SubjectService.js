/**
 * Created by guillaume on 21/11/2014.
 */

angular.module('app.services.subject', [])
    .service('SubjectService',
    ['$sailsSocket', 'BaseModel',
        function ($sailsSocket, BaseModel) {

            var endpoint = 'subject';

            // Get model
            var model = angular.copy(BaseModel);

            model.setEndpoint(endpoint);

            return model;
        }
    ]);