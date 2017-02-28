angular
    .module("sanesacttFrontendApp")
        .factory("UbicacionesService", function($resource) {
            return $resource(angular.module("sanesacttFrontendApp").path_location + "ubicaciones/:id.json", {id:'@id'}, {
                buscar: {
                    method: 'GET',
                    url: angular.module("sanesacttFrontendApp").path_location + "ubicaciones/buscar/:texto.json"
                },
                buscarUbicaciones: {
                    method: 'POST',
                    url: angular.module("sanesacttFrontendApp").path_location + "ubicaciones/buscarUbicaciones/.json"
                }
            });
        });