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
    AccidentesService, $stateParams, $utilsViewService, $q) {
    
    $('#nvbNavegador').css('display', 'none');
    $('body').css('padding-top', 0);
    $('#dvContainer').removeClass('container');
    $('#dvContainer').addClass('container-fluid');
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY";
   
    $scope.optionsBarHor = {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datalabels: {
                align: 'right',
                anchor: 'end'
            }
        }};
    
    $scope.optionsBarVer = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datalabels: {
                align: 'top',
                anchor: 'end'
            }
        }
    };
        
    $scope.getUbicacion = function(ubicacion_id) {
        return $q(function(resolve, reject) {
            UbicacionesService.get({id: ubicacion_id}, function (data) {
                $scope.ubicacion = data.ubicacion;
                resolve($scope.ubicacion.id);
            });
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
        $scope.fechaInicio = fechaInicio;
        $scope.fechaCierre = fechaCierre;
                
        $scope.year = date.getFullYear();
        
        $scope.getUbicacion($stateParams.ubicacion_id).then(function(ubicacion_id) {
            return $q.all([
                AccidentesService.getReportAnual({
                    fechaCierre: fechaCierre,
                    ubicacion_id: ubicacion_id
                }).$promise,
                AccidentesService.getReportMensual({
                    fechaInicio: fechaInicio,
                    fechaCierre: fechaCierre,
                    ubicacion_id: ubicacion_id
                }).$promise,
                AccidentesService.getReportDiario({
                    fechaInicio: fechaInicio,
                    fechaCierre: fechaCierre,
                    ubicacion_id: ubicacion_id
                }).$promise,
                AccidentesService.getReportServicios({
                    fechaInicio: fechaInicio,
                    fechaCierre: fechaCierre,
                    ubicacion_id: ubicacion_id
                }).$promise,
                AccidentesService.getReportPorHora({
                    fechaInicio: fechaInicio,
                    fechaCierre: fechaCierre,
                    ubicacion_id: ubicacion_id
                }).$promise,
                AccidentesService.getReportVehiculos({
                    fechaInicio: fechaInicio,
                    fechaCierre: fechaCierre,
                    ubicacion_id: ubicacion_id
                }).$promise,
                AccidentesService.getReportCausas({
                    fechaInicio: fechaInicio,
                    fechaCierre: fechaCierre,
                    ubicacion_id: ubicacion_id
                }).$promise,
                AccidentesService.getReportConsecuencias({
                    fechaInicio: fechaInicio,
                    fechaCierre: fechaCierre,
                    ubicacion_id: ubicacion_id
                }).$promise,
                AccidentesService.getReportDetalle({
                    fechaInicio: fechaInicio,
                    fechaCierre: fechaCierre,
                    ubicacion_id: ubicacion_id
                }).$promise
            ]).then(function(data) {
                // Anual
                $scope.labelsAnual = data[0].labels;
                $scope.dataAnual = data[0].datos;
                
                var max = $utilsViewService.getMaxValue($scope.dataAnual);
                var maxIndexes = $utilsViewService.getMaxIndexes($scope.dataAnual);

                if (maxIndexes.length === 1) {
                    $scope.textoAnual = 'La mayor cantidad de accidentes ocurrieron en el año ' + $scope.labelsAnual[maxIndexes[0]] + ' (' + max + ' accidentes estimados)';
                } else {
                    var labelsMaxAnual = [];
                    maxIndexes.forEach(function(index) {
                        labelsMaxAnual.push($scope.labelsAnual[index]);
                    });
                    $scope.textoAnual = 'La mayor cantidad de accidentes ocurrieron en los años ' + labelsMaxAnual.join(', ') + ' (' + max + ' accidentes estimados)';
                }
                
                $scope.labelsMensual = data[1].labels;
                $scope.dataMensual = data[1].datos;
                
                $scope.labelsDiaria = data[2].labels;
                $scope.dataDiaria = data[2].datos;
                
                $scope.labelsTipoServicio = data[3].labels;
                $scope.dataTipoServicio = data[3].datos;
                
                $scope.labelsATHora = data[4].labels;
                $scope.dataATHora = data[4].datos;
                
                $scope.labelsTipoVehiculo = data[5].labels;
                $scope.dataTipoVehiculo = data[5].datos;
                
                $scope.labelsCausa = data[6].labels;
                $scope.dataCausa = data[6].datos;
                
                $scope.labelsConsInvolucrado = data[7].labels;
                $scope.dataConsInvolucrado = data[7].datos;
                
                $scope.cantidad = data[8].cantidad;
            });
        });
    };
    
    $scope.init();
});