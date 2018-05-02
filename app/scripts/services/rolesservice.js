'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.RolesService
 * @description
 * # RolesService
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
.factory('RolesService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'roles/:id.json', {}, {
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'roles/getAdmin/.json'
        }
    });
});