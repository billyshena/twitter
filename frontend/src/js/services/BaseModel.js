/**
 * Created by guillaume on 21/11/2014.
 */

angular.module('app.services.basemodel', [])
    .service('BaseModel',
    ['$sailsSocket',
        function ($sailsSocket) {

            var appUrl = appConfig.appUrl;

            var model = this;

            /**
             * Single object for current endpoint, this is populated automatic with 'fetch' function.
             *
             * @type {{}}
             */
            model.object = {};

            /**
             * Array of finded objects for current endpoint, this is populated with 'find' function.
             *
             * @type {Array}
             */
            model.objects = [];

            /**
             * Current model instance endpoint. This can be set via 'setEndpoint' service function.
             *
             * @type {string}
             */
            model.endpoint = '';

            /**
             * Cache for model 'count', 'fetch' and 'find' parameters. These are needed to determine model data
             * after some event.
             *
             * @type    {{
                     *              count: {},
                     *              fetch: {},
                     *              find: {}
                     *          }}
             */
            model.cache = {
                count: {},
                fetch: {},
                find: {}
            };

            /**
             * Current scope where this model is used, this is needed to update scope data on socket events.
             * By default this is set to false.
             *
             * @type {boolean|{}}
             */
            model.scope = false;

            /**
             * Used item names within specified scope
             *
             * @type    {{
                     *              object: boolean|string,
                     *              objects: boolean|string,
                     *              count: boolean|string
                     *          }}
             */
            model.itemNames = {
                object: false,
                objects: false,
                count: false
            };

            /**
             * Service function to set used model endpoint. Note that this will also trigger subscribe for
             * this endpoint actions (created, updated, deleted, etc.).
             *
             * @param   {string}    endpoint    Model endpoint definition
             */
            model.setEndpoint = function setEndpoint(endpoint) {
                var self = this;

                // Set used endpoint
                self.endpoint = endpoint;

                // Subscribe to specified endpoint
                self._subscribe();
            };

            /**
             * Service function to set used model and 'item' names which are updated on specified scope when
             * socket events occurs.
             *
             * @param   {{}}        scope
             * @param   {string}    [nameObject]
             * @param   {string}    [nameObjects]
             * @param   {string}    [nameCount]
             */
            model.setScope = function setScope(scope, nameObject, nameObjects, nameCount) {
                var self = this;

                self.scope = scope;
                self.itemNames = {
                    object: nameObject || false,
                    objects: nameObjects || false,
                    count: nameCount || false
                };
            };

            /**
             * Default behaviour for created objects for specified endpoint. If you need some custom logic
             * for your model, just overwrite this function on your model.
             *
             * @param   {{
                     *              verb:       String,
                     *              data:       {},
                     *              id:         Number,
                     *              [previous]: {}
                     *          }}  message
             */
            model.handlerCreated = function handlerCreated(message) {
                var self = this;

                console.log('Object created', self.endpoint, message);
            };

            /**
             * Default behaviour for updated objects for specified endpoint. If you need some custom logic
             * for your model, just overwrite this function on your model.
             *
             * @param   {{
                     *              verb:       String,
                     *              data:       {},
                     *              id:         Number,
                     *              [previous]: {}
                     *          }}  message
             */
            model.handlerUpdated = function handlerUpdated(message) {
                var self = this;

                console.log('Object updated', self.endpoint, message);

                if (self.scope) {
                    if (self.itemNames.object && parseInt(message.id, 10) === parseInt(self.object.id, 10)) {
                        self.fetch(null, null, true);
                    }

                    if (self.itemNames.objects) {
                        self.find(null, true);
                    }

                    if (self.itemNames.count) {
                        self.count(null, true);
                    }
                }
            };

            /**
             * Default behaviour for deleted objects for specified endpoint. If you need some custom logic
             * for your model, just overwrite this function on your model.
             *
             * @param   {{
                     *              verb:       String,
                     *              data:       {},
                     *              id:         Number,
                     *              [previous]: {}
                     *          }}  message
             */
            model.handlerDeleted = function handlerDeleted(message) {
                var self = this;
                console.log('Object deleted', self.endpoint, message);
            };

            /**
             * Default behaviour for addedTo events for specified endpoint. If you need some custom logic for
             * your model, just overwrite this function on your model.
             *
             * @param   {{
                     *              verb:       String,
                     *              data:       {},
                     *              id:         Number,
                     *              [previous]: {}
                     *          }}  message
             */
            model.handlerAddedTo = function handlerAddedTo(message) {
                var self = this;

                console.log('AddedTo', self.endpoint, message);
            };

            /**
             * Default behaviour for removedFrom events for specified endpoint. If you need some custom logic
             * for your model, just overwrite this function on your model.
             *
             * @param   {{
                     *              verb:       String,
                     *              data:       {},
                     *              id:         Number,
                     *              [previous]: {}
                     *          }}  message
             */
            model.handlerRemovedFrom = function handlerRemovedFrom(message) {
                var self = this;

                console.log('RemovedFrom', self.endpoint, message);
            };



            /**
             * Helper function to get "proper" end point url for sails backend API.
             *
             * @param   {string}    endPoint        Name of the end point
             * @param   {number}    [identifier]    Identifier of endpoint object
             *
             * @returns {string}
             * @private
             */
            function _parseEndPointUrl(endPoint, identifier) {
                if (identifier != null) {
                    endPoint = endPoint + '/' + identifier;
                }
                console.log(appConfig.appUrl + '/' + endPoint)
                return appConfig.appUrl + '/' + endPoint;
            }

            /**
             * Helper function to parse used parameters in 'get' and 'count' methods.
             *
             * @param   {{}}    parameters  Used query parameters
             *
             * @returns {{params: {}}}
             * @private
             */
            function _parseParameters(parameters) {
                parameters = parameters || {};

                return { params: parameters };
            }



            /**
             * Service function to return count of objects with specified parameters.
             *
             * @param   {{}}        [parameters]    Query parameters
             * @param   {Boolean}   [fromCache]     Fetch with cache parameters
             *
             * @returns {Promise|models.count}
             */
            model.count = function count(parameters, fromCache) {
                var self = this;

                if (fromCache) {
                    parameters = self.cache.count.parameters;
                } else {
                    // Store used parameters
                    self.cache.count = {
                        parameters: parameters
                    };
                }

                return $sailsSocket
                    .get(_parseEndPointUrl(self.endpoint + '/count/'), _parseParameters(parameters))
                    .then(
                    function onSuccess(response) {
                        console.log(response);
                        return response.data;
                    }
                );
            };


            /**
             * Service function to find objects from specified endpoint with given parameters. Note that this
             * function will also store those objects to current service instance.
             *
             * @param   {{}}        [parameters]    Query parameters
             * @param   {Boolean}   [fromCache]     Fetch with cache parameters
             *
             * @returns {Promise|*}
             */
            model.find = function find(parameters, fromCache) {
                var self = this;

                if (fromCache) {
                    parameters = self.cache.find.parameters;
                } else {
                    // Store used parameters
                    self.cache.find = {
                        parameters: parameters
                    };
                }

                return $sailsSocket
                    .get(_parseEndPointUrl(self.endpoint), _parseParameters(parameters))
                    .then(
                    function onSuccess(response) {
                        self.objects = response.data;

                        if (fromCache && self.scope && self.itemNames.objects) {
                            self.scope[self.itemNames.objects] = self.objects;
                        }

                        return self.objects;
                    }
                );
            };

            /**
             * Service function to find single object from specified endpoint with given parameters. Note that
             * this will also store fetched object to current instance of this service.
             *
             * @param   {Number}    identifier      Object identifier
             * @param   {{}}        [parameters]    Query parameters
             * @param   {Boolean}   [fromCache]     Fetch with cache parameters
             *
             * @returns {Promise|*}
             */
            model.findOne = function findOne(identifier, parameters, fromCache) {

                console.log('ident ' + identifier)
                var self = this;

                if (fromCache) {
                    identifier = self.cache.fetch.identifier;
                    parameters = self.cache.fetch.parameters;
                } else {
                    // Store identifier and used parameters to cache
                    self.cache.fetch = {
                        identifier: identifier,
                        parameters: parameters
                    };
                }

                return $sailsSocket
                    .get(_parseEndPointUrl(self.endpoint, identifier), _parseParameters(parameters))
                    .then(
                    function onSuccess(response) {
                        self.object = response.data;

                        //if (fromCache && self.scope && self.itemNames.objects) {
                        //    self.scope[self.itemNames.objects] = self.objects;
                        //}

                        return self.object;
                    }
                );
            };

            /**
             * Service function to create new object to current model endpoint. Note that this will also
             * trigger 'handleMessage' service function, which will handle all necessary updates to current
             * service instance.
             *
             * @param   {{}}    data    Object data to create
             *
             * @returns {Promise|*}
             */
            model.create = function create(data, fromCache) {
                var self = this;

                return $sailsSocket
                    .post(_parseEndPointUrl(self.endpoint), data)
                    .then(
                    function onSuccess(response) {
                        return response.data;
                    }
                );
            };

            /**
             * Service function to update specified object in current model endpoint. Note that this will also
             * trigger 'handleMessage' service function, which will handle all necessary updates to current
             * service instance.
             *
             * @param   {Number}    identifier  Object identifier
             * @param   {{}}        data        Object data to update
             *
             * @returns {Promise|*}
             */
            model.update = function update(identifier, data) {
                var self = this;
                console.log(identifier)
                return $sailsSocket
                    .put(_parseEndPointUrl(self.endpoint, identifier), data)
                    .then(
                        function onSuccess(response) {
                            return response;
                        }
                    );
            };

            /**
             * Service function to delete specified object from current model endpoint. Note that this will
             * also trigger 'handleMessage' service function, which will handle all necessary updates to
             * current service instance.
             *
             * @param   {Number}    identifier  Object identifier
             *
             * @returns {Promise|*}
             */
            model.delete = function deleteObject(identifier, fromCache) {
                var self = this;

                return $sailsSocket
                    .delete(_parseEndPointUrl(self.endpoint, identifier.id))
                    .then(
                        function onSuccess(response) {
                            if (fromCache && self.scope && self.itemNames.objects) {
                                self.scope[self.itemNames.objects] = self.objects;
                            }
                            self.objects.splice(self.objects.indexOf(identifier), 1);

                            return self.objects;
                        }
                    );
            };

            /**
             * Service function to subscribe model socket events. This is needed to update model data according
             * to another users updates (create, update, delete, etc.) within this model. Basically this will
             * just trigger one of following service function calls:
             *
             *  - handlerCreated
             *  - handlerUpdated
             *  - handlerDeleted
             *  - handlerAddedTo
             *  - handlerRemovedFrom
             *
             * @private
             */
            model._subscribe = function subscribe() {
                var self = this;

                // Actual subscribe
                $sailsSocket
                    .subscribe(self.endpoint, function modelEvent(message) {
                        // Handle socket event
                        self._handleEvent(message);
                    });
            };

            /**
             * Generic event handler for model events (created, updated, deleted, etc.). This function is
             * called from model socket events and 'create', 'update' and 'delete' service function.
             *
             * @param   {{
                     *              verb:   String,
                     *              data:   {},
                     *              id:     Number
                     *          }}  message Message to handle
             *
             * @private
             */
            model._handleEvent = function handleEvent(message) {
                var self = this;
                var method = 'handler' + message.verb[0].toUpperCase() + message.verb.slice(1);

                if (_.isFunction(self[method])) {
                    self[method](message);
                } else {
                    console.log('Implement handling for \'' + message.verb + '\' socket messages');
                }
            };

            return model;
        }
    ]);