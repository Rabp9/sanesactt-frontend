'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:DetalleAccidentesAddCtrl
 * @description
 * # DetalleAccidentesAddCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('DetalleAccidentesAddCtrl', function ($scope, TipoVehiculosService, 
    TipoServiciosService, $uibModalInstance, $utilsViewService,
    $uibModal) {
    
    $scope.detalle_accidente = {};
        
    $scope.getTipoVehiculos = function() {
        $scope.loading_tipo_vehiculos = 'Cargando...';
        TipoVehiculosService.get(function(data) {
            $scope.loading_tipo_vehiculos = 'Selecciona uno';
            $scope.tipo_vehiculos = data.tipo_vehiculos;
        });
    };
      
    $scope.getTipoServicios = function() {
        $scope.loading_tipo_servicios = 'Cargando...';
        TipoServiciosService.get(function(data) {
            $scope.loading_tipo_servicios = 'Selecciona uno';
            $scope.tipo_servicios = data.tipo_servicios;
        });
    };
    
    $scope.init = function() {
        $scope.getTipoVehiculos();
        $scope.getTipoServicios();
    };
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveDetalleAccidente = function(detalle_accidente, btn) {
        $utilsViewService.disable('#' + btn);
        $uibModalInstance.close(detalle_accidente);
    };
    
    $scope.showTipoVehiculosAdd = function(event) {
        $utilsViewService.disable(event.currentTarget);
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/tipo-vehiculos-add.html',
            controller: 'TipoVehiculosAddCtrl',
            size: 'sm',
            backdrop: false
        });

        $utilsViewService.enable(event.currentTarget);
        modalInstanceAdd.result.then(function (data) {
            $scope.message = data;
            $scope.tipo_vehiculos.push(data.tipo_vehiculo);
            $scope.detalle_accidente.tipo_vehiculo_id = data.tipo_vehiculo.id;
        });
    };
    
    
    $scope.showTipoServiciosAdd = function(event) {
        $utilsViewService.disable(event.currentTarget);
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/tipo-servicios-add.html',
            controller: 'TipoServiciosAddCtrl',
            size: 'sm',
            backdrop: false
        });

        $utilsViewService.enable(event.currentTarget);
        modalInstanceAdd.result.then(function (data) {
            $scope.message = data;
            $scope.tipo_servicios.push(data.tipo_servicio);
            $scope.detalle_accidente.tipo_servicio_id = data.tipo_servicio.id;
        });
    };
    
    $scope.init();
});