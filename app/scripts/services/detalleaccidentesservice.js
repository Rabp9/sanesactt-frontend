'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.detalleAccidentesService
 * @description
 * # detalleAccidentesService
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
.factory('DetalleAccidentesService', function($resource, EnvService) {
    return $resource(EnvService.getHost() + 'detalle_accidentes/:id.json', {}, {
        remove: {
            method: 'DELETE',
            url: EnvService.getHost() + 'detalle_accidentes/:id.json'
        }
    });
});