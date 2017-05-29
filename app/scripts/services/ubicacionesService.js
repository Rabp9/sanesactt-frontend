'use strict';

angular
.module("sanesacttFrontendApp")
.factory("UbicacionesService", function($resource, EnvService) {
    return $resource(EnvService.getHost() + "ubicaciones/:id.json", {id:'@id'}, {
        buscar: {
            method: 'GET',
            url: EnvService.getHost() + "ubicaciones/buscar/:texto.json"
        },
        buscarUbicaciones: {
            method: 'POST',
            url: EnvService.getHost() + "ubicaciones/buscarUbicaciones/.json"
        }
    });
});