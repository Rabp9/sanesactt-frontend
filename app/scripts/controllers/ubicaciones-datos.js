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
    
    $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY';
    $scope.showBtnPrint = false;
    
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
                $scope.labelsATHoraExtra = data[4].labelsExtra;
                $scope.dataATHora = data[4].datos;
                
                var maxATHora = $utilsViewService.getMaxValue($scope.dataATHora);
                var maxIndexesATHora = $utilsViewService.getMaxIndexes($scope.dataATHora);

                if (maxIndexesATHora.length === 1) {
                    $scope.textoATHora = 'Según la información recolectada, hubo mayor frecuencia de accidentes en la ' + $scope.labelsATHora[maxIndexesATHora[0]] + ' (' + $scope.labelsATHoraExtra[maxIndexesATHora[0]] + ').';
                } else {
                    var labelsMaxATHora = [];
                    maxIndexesATHora.forEach(function(index) {
                        labelsMaxATHora.push($scope.labelsATHora[index]);
                    });
                    $scope.textoATHora = 'Según la información recolectada, hubo mayor frecuencia de accidentes en la ' + labelsMaxATHora.join(', ') + ' (' + maxATHora + ' accidentes)';
                }
                
                // TipoVehiculo
                $scope.labelsTipoVehiculo = data[5].labels;
                $scope.dataTipoVehiculo = data[5].datos;
                
                var maxTipoVehiculo = $utilsViewService.getMaxValue($scope.dataTipoVehiculo);
                var maxIndexesTipoVehiculo = $utilsViewService.getMaxIndexes($scope.dataTipoVehiculo);

                if (maxIndexesTipoVehiculo.length === 1) {
                    $scope.textoTipoVehiculo = 'El tipo de vehículo más asociado a los accidentes fue ' + $scope.labelsTipoVehiculo[maxIndexesTipoVehiculo[0]] + ' (' + maxTipoVehiculo + ' accidentes).';
                } else {
                    var labelsMaxTipoVehiculo = [];
                    maxIndexesTipoVehiculo.forEach(function(index) {
                        labelsMaxTipoVehiculo.push($scope.labelsTipoVehiculo[index]);
                    });
                    $scope.textoTipoVehiculo = 'Los tipos de vehículos más asociados a los accidentes fueron ' + labelsMaxTipoVehiculo.join(', ') + ' (' + maxTipoVehiculo + ' accidentes).';
                }
                
                // Causa
                $scope.labelsCausa = data[6].labels;
                $scope.dataCausa = data[6].datos;
                
                var maxCausa = $utilsViewService.getMaxValue($scope.dataCausa);
                var maxIndexesCausa = $utilsViewService.getMaxIndexes($scope.dataCausa);

                if (maxIndexesCausa.length === 1) {
                    $scope.textoCausa = 'El principal factor asociado a los accidentes de este punto negro fue ' + $scope.labelsCausa[maxIndexesCausa[0]] + ' (' + maxCausa + ' accidentes).';
                } else {
                    var labelsMaxCausa = [];
                    maxIndexesCausa.forEach(function(index) {
                        labelsMaxCausa.push($scope.labelsCausa[index]);
                    });
                    $scope.textoCausa = 'Los principales factores asociados a los accidentes de este punto negro fueron ' + labelsMaxCausa.join(', ') + ' (' + maxCausa + ' accidentes).';
                }
                
                // ConsInvolucrado
                $scope.labelsConsInvolucrado = data[7].labels;
                $scope.dataConsInvolucrado = data[7].datos;
                
                var maxConsInvolucrado = $utilsViewService.getMaxValue($scope.dataConsInvolucrado);
                var maxIndexesConsInvolucrado = $utilsViewService.getMaxIndexes($scope.dataConsInvolucrado);

                if (maxIndexesConsInvolucrado.length === 1) {
                    $scope.textoConsInvolucrado = 'La mayoría de accidentes ocurridos en esta ubicación presentaron ' + $scope.labelsConsInvolucrado[maxIndexesConsInvolucrado[0]] + ' (' + maxConsInvolucrado + ').';
                } else {
                    var labelsMaxConsInvolucrado = [];
                    maxIndexesConsInvolucrado.forEach(function(index) {
                        labelsMaxConsInvolucrado.push($scope.labelsConsInvolucrado[index]);
                    });
                    $scope.textoConsInvolucrado = 'La mayoría de accidentes ocurridos en esta ubicación presentaron ' + labelsMaxConsInvolucrado.join(', ') + ' (' + maxConsInvolucrado + ').';
                }
                
                $scope.cantidad = data[8].cantidad;
                
                $scope.showBtnPrint = true;
            });
        });
    };
    
    $scope.exportPDF = function() {
        $('#btnPrint').hide();
        html2canvas(document.getElementById('print'), {
            useCORS: true,
            optimized: false,
            allowTaint: false,
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition  = {
                    pageSize: 'A4',
                    pageOrientation: 'landscape',
                    pageMargins: [ 10, 2, 10, 2],
                    info: {
                        title: 'TTTTTT',
                        author: 'TTTTTT',
                        subject: 'TTTTTTTTT',
                        keywords: 'TTTTTTTTT'
                    },
                    content: [{
                        image: data,
                        width: 822,
                        height: 600
                    }]
                };
                pdfMake.createPdf(docDefinition).open();
                $('#btnPrint').show();
            }
        });
    };
    
    $scope.init();
});