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
    AccidentesService, $state) {
    
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
    
    $scope.labelsAnual = ['2014', '2015', '2016', '2017'];
    $scope.seriesAnual = ['Frecuencia Anual'];
    $scope.dataAnual = [
        [65, 59, 80, 81]
    ];
    
    $scope.labelsMensual = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    $scope.seriesMensual = ['Frecuencia Mensual'];
    $scope.dataMensual = [
        [65, 59, 80, 81, 15, 50, 15, 15, 80, 70, 65, 15]
    ];
    
    $scope.labelsDiaria = ['Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.', 'Dom.'];
    $scope.seriesDiaria = ['Frecuencia Diaria'];
    $scope.dataDiaria = [
        [65, 59, 80, 81, 15, 50, 15]
    ];
    
    $scope.labelsTipoServicio = ['No Identificado', 'Transporte Privado', 'Transporte Público'];
    $scope.seriesTipoServicio = ['Tipo de Servicio'];
    $scope.dataTipoServicio = [
        [65, 59, 80]
    ];
    
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
    
    $scope.labelsTipoVehiculo = ['Moto Lineal', 'Camión', 'Ómnibus Urbano', 'Camioneta Rural', 'Camioneta pick up', 'Station wagon', 'Automóvil'];
    $scope.seriesTipoVehiculo = ['Vehículos Involucrados'];
    $scope.dataTipoVehiculo = [
        [65, 59, 80, 15, 65, 18, 14]
    ];
    
    $scope.labelsCausa = ['Desacato a la señal de tránsito por el peatón', 'Invasión del carril /maniobras no permitidas'];
    $scope.seriesCausa = ['Causas Asociadas'];
    $scope.dataCausa = [
        [156, 210]
    ];
    
    $scope.getUbicacion = function() {
        UbicacionesService.get({id: ubicacion_id}, function (data) {
            $scope.ubicacion = data.ubicacion;
            $scope.foto_preview = $scope.ubicacion.foto;
            $scope.ubicacion.foto = null;
        });
    };
    
    NgMap.getMap().then(function(map) {
        google.maps.event.trigger(map, 'resize'); 
    });
    
    $scope.init = function() {
        var date = new Date();
        var fechaInicio = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
        var fechaCierre = date;
        $scope.getUbicacion($state.params.ubicacion_id);
        $scope.getReportAnual(fechaInicio, fechaCierre, $scope.ubicacion.id);
        $scope.getReportMensual(fechaInicio, fechaCierre, $scope.ubicacion.id);
        $scope.getReportDiaria(fechaInicio, fechaCierre, $scope.ubicacion.id);
        $scope.getReportServicios(fechaInicio, fechaCierre, $scope.ubicacion.id);
        $scope.getReportPorHora(fechaInicio, fechaCierre, $scope.ubicacion.id);
        $scope.getReportVehiculos(fechaInicio, fechaCierre, $scope.ubicacion.id);
        $scope.getReportCausas(fechaInicio, fechaCierre, $scope.ubicacion.id);
        $scope.getReportConsecuencias(fechaInicio, fechaCierre, $scope.ubicacion.id);
        $scope.getReportDetalle(fechaInicio, fechaCierre, $scope.ubicacion.id);
    };
    
    $scope.getReportAnual = function(fechaInicio, fechaCierre, ubicacion_id) {
        AccidentesService.getReportAnual({
            fechaInicio: fechaInicio,
            fechaCierre: fechaCierre,
            ubicacion_id: ubicacion_id
        }, function(data) {
            $scope.labelsAnual = data.labels;
            $scope.dataAnual = data.datos;
        });
    };
    
    $scope.getReportMensual = function(fechaInicio, fechaCierre, ubicacion_id) {
        AccidentesService.getReportAnual({
            fechaInicio: fechaInicio,
            fechaCierre: fechaCierre,
            ubicacion_id: ubicacion_id
        }, function(data) {
            $scope.labelsAnual = data.labels;
            $scope.dataAnual = data.datos;
        });
    };
    
    $scope.getReportDiaria = function(fechaInicio, fechaCierre, ubicacion_id) {
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
});