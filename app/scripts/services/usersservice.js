'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.usersservice
 * @description
 * # usersservice
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
.factory('UsersService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'users/:id.json', {}, {
        getPersonas: {
            method: 'GET',
            url: EnvService.getHost() + 'users/getPersonas/.json'
        },
        login: {
            method: 'POST',
            url: EnvService.getHost() + 'users/token/.json',
        },
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'users/getAdmin/.json',
        }
    });
});