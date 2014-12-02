/**
 * Created by guillaume on 21/11/2014.
 */

angular.module('app.services.post', [])
    .service('TimelinePostService',
    ['$sailsSocket', 'BaseModel',
        function ($sailsSocket, BaseModel) {

            var endpoint = 'post';

            // Get model
            var model = angular.copy(BaseModel);

            model.setEndpoint(endpoint);


            // Custom handler for created objects
            model.handlerCreated = function handlerCreated(message) {
                model.objects.push(message.data);
            };

            return model;

        }
    ]);