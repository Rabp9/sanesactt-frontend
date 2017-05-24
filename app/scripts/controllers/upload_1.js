'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('UploadCtrl', function ($scope, AccidentesService, UbicacionesService, CausasService, $uibModal, $utilsService) {
    // Ubicaciones
    var fetchingRecordsUbicaciones = false;
    $scope.accidentes = {};
    
    $scope.onselectitemUbicacion = function(selecteditem, accidente) {
        accidente.ubicacion_text = selecteditem.Key;
        $scope.checkAccidente(accidente);
    };
        
    $scope.getUbicaciones = function (searchKey, pagenumber) {
        if (searchKey === undefined) {
            searchKey = '';
        }
        if (fetchingRecordsUbicaciones) {
            return;
        }
        fetchingRecordsUbicaciones = true;
        UbicacionesService.buscarUbicaciones({search: searchKey, pagenumber: pagenumber}, function(data) {
            if (pagenumber === 1) {
                $scope.totalRecordsUbicaciones = data.TotalRecords;
                $scope.ubicaciones = data.ubicaciones;
            }
            else {
                $scope.ubicaciones = $scope.ubicaciones.concat(data.ubicaciones);
            }
            fetchingRecordsUbicaciones = false; 
        });
    };
                
    $scope.showUbicacionesAdd = function(ubicacion_dirty, event) {
        $utilsService.disable(event.currentTarget);
        var modalInstance = $uibModal.open({
            templateUrl: 'views/ubicaciones-add.html',
            controller: 'UbicacionesAddCtrl',
            backdrop: false,
            resolve: {
                ubicacion_text: function () {
                    return accidente.ubicacion_text;
                }
            }
        });
        modalInstance.result.then(function (data) {
            accidente.ubicacion = data.ubicacion;
            accidente.ubicacion_text = data.ubicacion.descripcion;
            $scope.getUbicaciones("", 1);
        });
    };
        
    // Causas
    var fetchingRecordsCausas = false;
        
    $scope.onselectitemCausa = function(selecteditem, accidente) {
        accidente.causa_text = selecteditem.Key;
        $scope.checkAccidente(accidente);
    }
        
    $scope.getCausas = function (searchKey, pagenumber) {
        if (searchKey === undefined) {
            searchKey = '';
        }
        if (fetchingRecordsCausas) {
            return;
        }
        fetchingRecordsCausas = true;
        CausasService.buscarCausas({search: searchKey, pagenumber: pagenumber}, function(data) {
            if (pagenumber === 1) {
                $scope.totalRecordsCausas = data.TotalRecords;
                $scope.causas = data.causas;
            }
            else {
                $scope.causas = $scope.causas.concat(data.causas);
            }
            fetchingRecordsCausas = false; 
        });
    };
               
    $scope.showCausasAdd = function(accidente) {
        $scope.newCausa = {};
        var modalInstance = $uibModal.open({
            templateUrl: 'views/causas-add.html',
            controller: 'CausasAddCtrl',
            backdrop: false,
            resolve: {
                causa_text: function () {
                    return accidente.causa_text;
                }
            }
        });
        modalInstance.result.then(function (data) {
            accidente.causa = data.causa;
            accidente.causa_text = data.causa.descripcion;
            $scope.getCausas("", 1);
        });
    };
        
    $scope.uploadFile = function(file) {
        var file = $scope.csv;
        var fd = new FormData();
        fd.append('file', file);
        
        AccidentesService.load(fd, function(data) {
            $scope.accidentes = data.accidentes;
            $scope.getUbicaciones("", 1);
            $scope.getCausas("", 1);
        });
    };
    
    $scope.checkAccidente = function(accidente) {
        if (accidente.ubicacion != undefined && accidente.causa != undefined) {
            accidente.procesado = true;
        }
    };
});