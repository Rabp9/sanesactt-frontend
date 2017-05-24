'use strict';

angular.module("sanesacttFrontendApp")
.factory("AccidentesService", function($resource) {
    return $resource(angular.module("sanesacttFrontendApp").path_location + "accidentes/:id.json", {}, {
        load: {
            method: 'POST',
            url: angular.module("sanesacttFrontendApp").path_location + "accidentes/load/.json",
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        saveMany: {
            method: 'POST',
            url: angular.module("sanesacttFrontendApp").path_location + "accidentes/saveMany.json",
        }
    });
});