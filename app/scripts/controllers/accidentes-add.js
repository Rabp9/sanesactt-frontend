'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:AccidentesAddCtrl
 * @description
 * # AccidentesAddCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('AccidentesAddCtrl', function ($scope, $uibModalInstance, 
    AccidentesService, UbicacionesService, CausasService, $uibModal, $utilsViewService,
    TipoServiciosService, TipoVehiculosService, $q) {
    
    $scope.accidente = {};
    $scope.message = {};
    
    $scope.getUbicaciones = function() {
        $scope.loading_ubicaciones = "Cargando...";
        UbicacionesService.get(function (data) {
            $scope.ubicaciones = data.ubicaciones;
            $scope.loading_ubicaciones = "Selecciona una Ubicación";
        });
    };
    
    $scope.getCausas = function() {
        CausasService.get(function (data) {
            $scope.causas = data.causas;
        });
    };
    
    $scope.init = function() {
        $scope.getUbicaciones();
        $scope.getCausas();
        $scope.accidente.estado_id = 1;
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
            $q.all([
                 TipoServiciosService.get({id: data.tipo_servicio_id}).$promise,
                 TipoVehiculosService.get({id: data.tipo_vehiculo_id}).$promise
            ]).then(function(data) {
                var tipo_servicio = data[0].tipo_servicio;
                var tipo_vehiculo = data[1].tipo_vehiculo;
                
                var detalle_accidente = {
                    tipo_vehiculo: tipo_vehiculo,
                    tipo_servicio: tipo_servicio
                };
                $scope.accidente.detalle_accidentes.push(detalle_accidente);
            });
            
        });
    };
    
    $scope.removeDetalle = function(detalle_accidente) {
        var index = $scope.accidente.detalle_accidentes.indexOf(detalle_accidente);
        $scope.accidente.detalle_accidentes.splice(index, 1);
    };
    
    $scope.saveAccidente = function(accidente, boton) {
        $utilsViewService.disable('#' + boton);
        
        if (accidente.fechaHora !== null) {
            accidente.fechaHora = formatDateTime(accidente.fechaHora);
        }
        AccidentesService.save(accidente, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    function formatDateTime(fecha) {
        if (fecha === undefined) {
            return undefined;
        }
        return fecha.getFullYear() + '-' + str_pad((fecha.getMonth() + 1), '00') + '-' + str_pad(fecha.getDate(), '00') + ' ' + str_pad(fecha.getHours(), '00') + ':' + str_pad(fecha.getMinutes(), '00');
    }
    
    function str_pad(str, pad) {
        return pad.substring(0, (pad.length - str.toString().length)) + str;
    }
    
    $scope.init();
});