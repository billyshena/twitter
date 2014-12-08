'use strict';
angular.module('app', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'app.controllers.main',
    'app.controllers.home',
    'app.controllers.timeline',
    'app.services.logger',
    'app.controllers.tweet',
    'app.services.auth',
    'app.services.storage',
    'app.interceptors.auth',
    'app.controllers.user',
    'app.controllers.avatar',
    'app.directives.upload'
]);