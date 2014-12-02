/**
 * Created by bshen on 30/11/14.
 */

angular.module('app.services.content', [])
    .service('ContentService',
    ['$sailsSocket', 'BaseModel',
        function ($sailsSocket, BaseModel) {

            var endpoint = 'content';

            // Get model
            var model = angular.copy(BaseModel);

            model.setEndpoint(endpoint);

            return model;
        }
    ]);