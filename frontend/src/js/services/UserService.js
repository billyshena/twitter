/**
 * Created by guillaume on 21/11/2014.
 */

angular.module('app.services.user', [])
    .service('UserService',
    ['$sailsSocket', 'BaseModel',
        function ($sailsSocket, BaseModel) {

            var endpoint = 'user';

            // Get model
            var model = angular.copy(BaseModel);

            model.setEndpoint(endpoint);

            console.log(model.endpoint);

            return model;

        }
    ]);/**
 * Created by guillaume on 22/11/2014.
 */
