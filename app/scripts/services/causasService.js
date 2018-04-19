'use strict';

angular
.module("sanesacttFrontendApp")
.factory("CausasService", function($resource, EnvService) {
    return $resource(EnvService.getHost() + "causas/:id.json", {}, {
        buscar: {
            method: 'GET',
            url: EnvService.getHost() + "causas/buscar/:texto.json"
        },
        buscarCausas: {
            method: 'POST',
            url: EnvService.getHost() + "causas/buscarCausas/.json"
        }
    });
});