/**
 * Created by guillaume on 21/11/2014.
 */

angular.module('app.services.file', [])
    .service('FileService',
    ['$sailsSocket', 'BaseModel', 'CurrentUser',
        function ($sailsSocket, BaseModel, CurrentUser) {

            var endpoint = 'file';

            // Get model
            var model = angular.copy(BaseModel);

            model.setEndpoint(endpoint);

            // Custom handler for created objects
            model.handlerCreated = function handlerCreated(message) {
                console.log(message);
                if(message.data.owner == CurrentUser.getId()) {
                    message.data.icon = MimeType.fileIcon(message.data);
                    model.objects.push(message.data);
                }
            };

            return model;

        }
    ]);