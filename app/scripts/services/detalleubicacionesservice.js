'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.DetalleUbicacionesService
 * @description
 * # DetalleUbicacionesService
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
.factory('DetalleUbicacionesService', function($resource, EnvService) {
    return $resource(EnvService.getHost() + 'detalle_ubicaciones/:id.json', {}, {
        remove: {
            method: 'DELETE',
            url: EnvService.getHost() + 'detalle_ubicaciones/:id.json'
        }
    });
});