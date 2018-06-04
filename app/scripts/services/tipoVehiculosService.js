'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.tipoVehiculosService
 * @description
 * # tipoVehiculosService
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
.factory('TipoVehiculosService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'tipo_vehiculos/:id.json');
});