'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.controllersService
 * @description
 * # controllersService
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
.factory('ControllersService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'controllers/:id.json', {});
});