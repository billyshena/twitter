/**
 * Created by guillaume on 21/11/2014.
 */

angular.module('app.services.school', [])
    .service('SchoolService',
        ['$sailsSocket', 'BaseModel',
            function ($sailsSocket, BaseModel) {

                var endpoint = 'school';

                // Get model
                var model = angular.copy(BaseModel);

                model.setEndpoint(endpoint);

                console.log(model.endpoint);

                return model;

    }
]);