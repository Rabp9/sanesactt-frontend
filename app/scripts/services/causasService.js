angular
    .module("sanesacttFrontendApp")
        .factory("CausasService", function($resource) {
            return $resource(angular.module("sanesacttFrontendApp").path_location + "causas/:id.json", {id:'@id'}, {
                buscar: {
                    method: 'GET',
                    url: angular.module("sanesacttFrontendApp").path_location + "causas/buscar/:texto.json"
                },
                buscarCausas: {
                    method: 'POST',
                    url: angular.module("sanesacttFrontendApp").path_location + "causas/buscarCausas/.json"
                }
            });
        });