/**
 * Created by shen on 06/06/14.
 */
/**
 * Created by shen on 06/06/14.
 */
/**
 * Auth interceptor for HTTP and Socket request. This interceptor will add required
 * JWT (Json Web Token) token to each requests. That token is validated in server side
 * application.
 *
 * @see http://angular-tips.com/blog/2014/05/json-web-tokens-introduction/
 * @see http://angular-tips.com/blog/2014/05/json-web-tokens-examples/
 */
angular.module('app.interceptors.auth', [])
    .factory('AuthInterceptor',
    [
        '$q', '$injector', 'Storage',
        function ($q, $injector, Storage) {
            return {
                /**
                 * Interceptor method for $http requests. Main purpose of this method is to add JWT token
                 * to every request that application does.
                 *
                 * @param   {*} config
                 *
                 * @returns {*}
                 */
                request: function (config) {

                    if (config.url.indexOf('amazonaws.com') == -1) {
                        var token;

                        if (Storage.get('token')) {
                            token = JSON.parse(Storage.get('token')).hash;
                        }

                        // Yeah we have a token
                        if (token) {
                            if (!config.data) {
                                config.data = {};
                            }

                            /**
                             * Set token to actual data and headers. Note that we need both ways because of
                             * socket cannot modify headers anyway. These values are cleaned up in backend
                             * side policy (middleware).
                             */
                            config.data.token = token;
                            config.headers.Authorization = 'Bearer ' + token;
                        }
                    }

                    return config;
                },

                /**
                 * Interceptor method that is triggered whenever response error occurs on $http requests.
                 *
                 * @param   {*} response
                 *
                 * @returns {Promise}
                 */
                responseError: function (response) {
                    if (response.status === 401 || response.status === 403) {
                        Storage.unset('token');
                        $injector.get('$state').go('app.home');
                    }

                    return $q.reject(response);
                }
            };
        }
    ]
);