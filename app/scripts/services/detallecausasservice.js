'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.detalleCausasService
 * @description
 * # detalleCausasService
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
.factory('DetalleCausasService', function($resource, EnvService) {
    return $resource(EnvService.getHost() + 'detalle_causas/:id.json', {}, {
        remove: {
            method: 'DELETE',
            url: EnvService.getHost() + 'detalle_causas/:id.json'
        }
    });
});