'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:AccidentesEditCtrl
 * @description
 * # AccidentesEditCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('AccidentesEditCtrl', function ($scope, accidente_nro_id, accidente_anio, $uibModalInstance, 
    AccidentesService, UbicacionesService, CausasService, $uibModal, $utilsViewService) {
        
    $scope.message = {};
    
    $scope.getAccidente = function() {
        AccidentesService.getByNroIdNAnio({
            nro_id: accidente_nro_id,
            anio: accidente_anio
        }, function (data) {
            $scope.accidente = data.accidente;
            var parseDate = new Date($scope.accidente.fechaHora);
            $scope.accidente.fechaHora = parseDate;
            console.log($scope.accidente);
        }, function (err) {
            $scope.message = err.data;
        });
    };
    
    $scope.getUbicaciones = function() {
        UbicacionesService.get(function (data) {
            $scope.ubicaciones = data.ubicaciones;
        });
    };
    
    $scope.getCausas = function() {
        CausasService.get(function (data) {
            $scope.causas = data.causas;
        });
    };
    
    $scope.init = function() {
        $scope.getAccidente();
        $scope.getUbicaciones();
        $scope.getCausas();
    };
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
       
    $scope.showUbicacionesAdd = function(ubicacion_dirty, event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/ubicaciones-add.html',
            controller: 'UbicacionesAddCtrl',
            backdrop: false,
            resolve: {
                ubicacion_dirty: function() {
                    return ubicacion_dirty;
                }
            }
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            $scope.getUbicaciones();
            $scope.message = data;
            $scope.accidente.ubicacion_id = $scope.message.ubicacion.id;
        });
    };
    
    $scope.showCausasAdd = function(causa_dirty, event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/causas-add.html',
            controller: 'CausasAddCtrl',
            backdrop: false,
            resolve: {
                causa_dirty: function() {
                    return causa_dirty;
                }
            }
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            $scope.getCausas();
            $scope.message = data;
            $scope.accidente.causa_id = $scope.message.causa.id;
        });
    };
    
    $scope.showDetalleAccidentesAdd = function(tipo_vehiculo_dirty, tipo_servicio_dirty, event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/detalle-accidentes-add.html',
            controller: 'DetalleAccidentesAddCtrl',
            backdrop: false,
            resolve: {
                tipo_vehiculo_dirty: function() {
                    return tipo_vehiculo_dirty;
                },
                tipo_servicio_dirty: function() {
                    return tipo_servicio_dirty;
                }
            }
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            
        });
    };
    
    $scope.init();
});