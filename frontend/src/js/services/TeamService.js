/**
 * Created by bshen on 26/11/14.
 */
angular.module('app.services.team', [])
    .service('TeamService',
    ['$sailsSocket', 'BaseModel',
        function ($sailsSocket, BaseModel) {

            var endpoint = 'team';

            // Get model
            var model = angular.copy(BaseModel);

            model.setEndpoint(endpoint);


            // /team/id/users/id

            model.addUser = function addUser(team, user) {

                return $sailsSocket
                    .post(appConfig.appUrl + '/' + endpoint + '/' + team.id + '/users/' + user.id)
                    .then(
                        function onSuccess(response) {
                            return response.data;
                        }
                    );
            };

            return model;
        }
    ]);