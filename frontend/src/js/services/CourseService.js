/**
 * Created by bshen on 26/11/14.
 */
/**
 * Created by guillaume on 21/11/2014.
 */

angular.module('app.services.course', [])
    .service('CourseService',
    ['$sailsSocket', 'BaseModel',
        function ($sailsSocket, BaseModel) {

            var endpoint = 'course';

            // Get model
            var model = angular.copy(BaseModel);

            model.setEndpoint(endpoint);

            return model;
        }
    ]);