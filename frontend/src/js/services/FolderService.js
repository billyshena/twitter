/**
 * Created by guillaume on 21/11/2014.
 */

angular.module('app.services.folder', [])
    .service('FolderService',
    ['$sailsSocket', 'BaseModel', 'MimeType', 'CurrentUser',
        function ($sailsSocket, BaseModel, MimeType, CurrentUser) {

            var endpoint = 'folder';

            // Get model
            var model = angular.copy(BaseModel);

            model.setEndpoint(endpoint);

            // Custom handler for created objects
            model.handlerCreated = function handlerCreated(message) {
                console.log(message);
                if(message.data.owner == CurrentUser.getId()) {
                    message.data.icon = MimeType.folderIcon(message.data);
                    model.objects.push(message.data);
                }
            };

            return model;

        }
    ]);