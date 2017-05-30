'use strict';

angular.module("sanesacttFrontendApp")
.factory("AccidentesService", function($resource, EnvService) {
    return $resource(EnvService.getHost() + "accidentes/:id.json", {}, {
        load: {
            method: 'POST',
            url: EnvService.getHost() + "accidentes/load/.json",
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        saveMany: {
            method: 'POST',
            url: EnvService.getHost() + "accidentes/saveMany.json"
        },
        getByNroIdNAnio: {
            method: 'GET',
            url: EnvService.getHost() + "accidentes/getByNroIdNAnio.json"
        }
    });
});