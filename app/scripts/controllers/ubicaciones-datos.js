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
                
                var maxAnual = $utilsViewService.getMaxValue($scope.dataAnual);
                var maxIndexesAnual = $utilsViewService.getMaxIndexes($scope.dataAnual);

                if (maxIndexesAnual.length === 1) {
                    $scope.textoAnual = 'La mayor cantidad de accidentes ocurrieron en el año ' + $scope.labelsAnual[maxIndexesAnual[0]] + ' (' + maxAnual + ' accidentes estimados).';
                } else {
                    var labelsMaxAnual = [];
                    maxIndexesAnual.forEach(function(index) {
                        labelsMaxAnual.push($scope.labelsAnual[index]);
                    });
                    $scope.textoAnual = 'La mayor cantidad de accidentes ocurrieron en los años ' + labelsMaxAnual.join(', ') + ' (' + maxAnual + ' accidentes estimados).';
                }
                
                // Mensual
                $scope.labelsMensual = data[1].labels;
                $scope.dataMensual = data[1].datos;
                
                var maxMensual = $utilsViewService.getMaxValue($scope.dataMensual);
                var maxIndexesMensual = $utilsViewService.getMaxIndexes($scope.dataMensual);

                if (maxIndexesMensual.length === 1) {
                    $scope.textoMensual = 'La mayor cantidad de accidentes ocurrieron en el mes de ' + $scope.labelsMensual[maxIndexesMensual[0]] + ' con un estimado de ' + maxMensual + ' accidentes.';
                } else {
                    var labelsMaxMensual = [];
                    maxIndexesMensual.forEach(function(index) {
                        labelsMaxMensual.push($scope.labelsMensual[index]);
                    });
                    $scope.textoMensual = 'La mayor cantidad de accidentes ocurrieron en los meses de ' + labelsMaxMensual.join(', ') + ' con un estimado de ' + maxMensual + ' accidentes estimados)';
                }
                
                // Diaria
                $scope.labelsDiaria = data[2].labels;
                $scope.dataDiaria = data[2].datos;
                
                var maxDiaria = $utilsViewService.getMaxValue($scope.dataDiaria);
                var maxIndexesDiaria = $utilsViewService.getMaxIndexes($scope.dataDiaria);

                if (maxIndexesDiaria.length === 1) {
                    $scope.textoDiaria = 'Se estima que hubo mayor incidencia de accidentes en los días ' + $scope.labelsDiaria[maxIndexesDiaria[0]] + ' (' + maxDiaria + ' accidentes).';
                } else {
                    var labelsMaxDiaria = [];
                    maxIndexesDiaria.forEach(function(index) {
                        labelsMaxDiaria.push($scope.labelsDiaria[index]);
                    });
                    $scope.textoDiaria = 'Se estima que hubo mayor incidencia de accidentes en los días ' + labelsMaxDiaria.join(', ') + ' (' + maxDiaria + ' accidentes).';
                }
                
                // TipoServicio
                $scope.labelsTipoServicio = data[3].labels;
                $scope.dataTipoServicio = data[3].datos;
                
                var maxTipoServicio = $utilsViewService.getMaxValue($scope.dataTipoServicio);
                var maxIndexesTipoServicio = $utilsViewService.getMaxIndexes($scope.dataTipoServicio);

                if (maxIndexesTipoServicio.length === 1) {
                    $scope.textoTipoServicio = 'Los accidentes estuvieron más relacionados al ' + $scope.labelsTipoServicio[maxIndexesTipoServicio[0]] + ' (' + maxTipoServicio + ' accidentes).';
                } else {
                    var labelsMaxTipoServicio = [];
                    maxIndexesTipoServicio.forEach(function(index) {
                        labelsMaxTipoServicio.push($scope.labelsTipoServicio[index]);
                    });
                    $scope.textoTipoServicio = 'Los accidentes estuvieron más relacionados al ' + labelsMaxTipoServicio.join(', ') + ' (' + maxTipoServicio + ' accidentes).';
                }
                
                // ATHora
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