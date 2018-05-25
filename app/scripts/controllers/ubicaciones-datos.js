'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UbicacionesDatosCtrl
 * @description
 * # UbicacionesDatosCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('UbicacionesDatosCtrl', function ($scope, NgMap, UbicacionesService, 
    AccidentesService, $stateParams, $utilsViewService) {
    
    $('#nvbNavegador').css('display', 'none');
    $('body').css('padding-top', 0);
    $('#dvContainer').removeClass('container');
    $('#dvContainer').addClass('container-fluid');
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY";
   
    $scope.optionsBarHor = {
        plugins: {
            datalabels: {
                align: 'right',
                anchor: 'end'
            }
        }};
    
    $scope.optionsBarVer = {
        plugins: {
            datalabels: {
                align: 'top',
                anchor: 'end'
            }
        }};
    
    $scope.labelsATHora = ['Madrugada', 'Mañana', 'Tarde', 'Noche'];
    $scope.seriesATHora = ['Frecuencia de AT por hora'];
    $scope.dataATHora = [
        [65, 59, 80, 15]
    ];
    
    $scope.labelsConsInvolucrado = ['Ilesos', 'Heridos', 'Fallecidos'];
    $scope.seriesConsInvolucrado = ['Consecuencias por Involucrado'];
    $scope.dataConsInvolucrado = [
        [65, 59, 80]
    ];
    
    $scope.labelsCausa = ['Desacato a la señal de tránsito por el peatón', 'Invasión del carril /maniobras no permitidas'];
    $scope.seriesCausa = ['Causas Asociadas'];
    $scope.dataCausa = [
        [156, 210]
    ];
    
    $scope.getUbicacion = function(ubicacion_id) {
        UbicacionesService.get({id: ubicacion_id}, function (data) {
            $scope.ubicacion = data.ubicacion;
        });
    };
    
    NgMap.getMap().then(function(map) {
        google.maps.event.trigger(map, 'resize'); 
    });
    
    $scope.init = function() {
        var date = new Date();
        var fechaInicioPre = new Date((date.getFullYear() - 1), date.getMonth(), date.getDate());
        var fechaCierrePre = date;
        var fechaInicio = $utilsViewService.formatDate(fechaInicioPre);
        var fechaCierre = $utilsViewService.formatDate(fechaCierrePre);
                
        $scope.year = date.getFullYear();
        $scope.getUbicacion($stateParams.ubicacion_id);
        $scope.getReportAnual(fechaCierre, $stateParams.ubicacion_id);
        $scope.getReportMensual(fechaInicio, fechaCierre, $stateParams.ubicacion_id);
        $scope.getReportDiario(fechaInicio, fechaCierre, $stateParams.ubicacion_id);
        $scope.getReportServicios(fechaInicio, fechaCierre, $stateParams.ubicacion_id);
        $scope.getReportPorHora(fechaInicio, fechaCierre, $stateParams.ubicacion_id);
        $scope.getReportVehiculos(fechaInicio, fechaCierre, $stateParams.ubicacion_id);
        $scope.getReportCausas(fechaInicio, fechaCierre, $stateParams.ubicacion_id);
        $scope.getReportConsecuencias(fechaInicio, fechaCierre, $stateParams.ubicacion_id);
        $scope.getReportDetalle(fechaInicio, fechaCierre, $stateParams.ubicacion_id);
    };
    
    $scope.getReportAnual = function(fechaCierre, ubicacion_id) {
        AccidentesService.getReportAnual({
            fechaCierre: fechaCierre,
            ubicacion_id: ubicacion_id
        }, function(data) {
            $scope.labelsAnual = data.labels;
            $scope.dataAnual = data.datos;
        });
    };
    
    $scope.getReportMensual = function(fechaInicio, fechaCierre, ubicacion_id) {
        AccidentesService.getReportMensual({
            fechaInicio: fechaInicio,
            fechaCierre: fechaCierre,
            ubicacion_id: ubicacion_id
        }, function(data) {
            $scope.labelsMensual = data.labels;
            $scope.dataMensual = data.datos;
        });
    };
    
    $scope.getReportDiario = function(fechaInicio, fechaCierre, ubicacion_id) {
        AccidentesService.getReportDiario({
            fechaInicio: fechaInicio,
            fechaCierre: fechaCierre,
            ubicacion_id: ubicacion_id
        }, function(data) {
            $scope.labelsDiaria = data.labels;
            $scope.dataDiaria = data.datos;
        });
    };
    
    $scope.getReportServicios = function(fechaInicio, fechaCierre, ubicacion_id) {
        AccidentesService.getReportServicios({
            fechaInicio: fechaInicio,
            fechaCierre: fechaCierre,
            ubicacion_id: ubicacion_id
        }, function(data) {
            $scope.labelsTipoServicio = data.labels;
            $scope.dataTipoServicio = data.datos;
        });
    };
    
    $scope.getReportPorHora = function(fechaInicio, fechaCierre, ubicacion_id) {
        AccidentesService.getReportPorHora({
            fechaInicio: fechaInicio,
            fechaCierre: fechaCierre,
            ubicacion_id: ubicacion_id
        }, function(data) {
            $scope.labelsATHora = data.labels;
            $scope.dataATHora = data.datos;
        });
    };
    
    $scope.getReportVehiculos = function(fechaInicio, fechaCierre, ubicacion_id) {
        AccidentesService.getReportVehiculos({
            fechaInicio: fechaInicio,
            fechaCierre: fechaCierre,
            ubicacion_id: ubicacion_id
        }, function(data) {
            $scope.labelsTipoVehiculo = data.labels;
            $scope.dataTipoVehiculo = data.datos;
        });
    };
    
    $scope.getReportCausas = function(fechaInicio, fechaCierre, ubicacion_id) {
        AccidentesService.getReportCausas({
            fechaInicio: fechaInicio,
            fechaCierre: fechaCierre,
            ubicacion_id: ubicacion_id
        }, function(data) {
            $scope.labelsCausa = data.labels;
            $scope.dataCausa = data.datos;
        });
    };
    
    $scope.getReportConsecuencias = function(fechaInicio, fechaCierre, ubicacion_id) {
        AccidentesService.getReportConsecuencias({
            fechaInicio: fechaInicio,
            fechaCierre: fechaCierre,
            ubicacion_id: ubicacion_id
        }, function(data) {
            $scope.labelsConsInvolucrado = data.labels;
            $scope.dataConsInvolucrado = data.datos;
        });
    };
    
    $scope.getReportDetalle = function(fechaInicio, fechaCierre, ubicacion_id) {
        AccidentesService.getReportDetalle({
            fechaInicio: fechaInicio,
            fechaCierre: fechaCierre,
            ubicacion_id: ubicacion_id
        }, function(data) {
            $scope.cantidad = data.cantidad;
        });  
    };
    
    $scope.init();
});