/**
 * Created by guillaume on 21/11/2014.
 */

angular.module('app.services.teamRequest', [])
    .service('TeamRequestService',
    ['$sailsSocket', 'BaseModel',
        function ($sailsSocket, BaseModel) {

            var endpoint = 'teamRequest';

            // Get model
            var model = angular.copy(BaseModel);

            model.setEndpoint(endpoint);

            return model;
        }
    ]);