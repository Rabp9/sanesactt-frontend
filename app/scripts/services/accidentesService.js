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
        },
        getReportAnual: {
            method: 'POST',
            url: EnvService.getHost() + "accidentes/getReportAnual.json"
        },
        getReportMensual: {
            method: 'POST',
            url: EnvService.getHost() + "accidentes/getReportMensual.json"
        },
        getReportDiario: {
            method: 'POST',
            url: EnvService.getHost() + "accidentes/getReportDiario.json"
        },
        getReportServicios: {
            method: 'POST',
            url: EnvService.getHost() + "accidentes/getReportServicios.json"
        },
        getReportPorHora: {
            method: 'POST',
            url: EnvService.getHost() + "accidentes/getReportPorHora.json"
        },
        getReportVehiculos: {
            method: 'POST',
            url: EnvService.getHost() + "accidentes/getReportVehiculos.json"
        },
        getReportCausas: {
            method: 'POST',
            url: EnvService.getHost() + "accidentes/getReportCausas.json"
        },
        getReportConsecuencias: {
            method: 'POST',
            url: EnvService.getHost() + "accidentes/getReportConsecuencias.json"
        },
        getReportDetalle: {
            method: 'POST',
            url: EnvService.getHost() + "accidentes/getReportDetalle.json"
        }
    });
});