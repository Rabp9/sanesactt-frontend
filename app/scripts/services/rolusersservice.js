'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.RolUsersService
 * @description
 * # RolUsersService
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
.factory('RolUsersService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'rol_users/:id.json');
});