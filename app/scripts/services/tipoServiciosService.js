'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.tipoServiciosService
 * @description
 * # tipoServiciosService
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
.factory('TipoServiciosService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'tipo_servicios/:id.json');
});