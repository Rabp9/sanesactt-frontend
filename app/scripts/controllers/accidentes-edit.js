'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:AccidentesEditCtrl
 * @description
 * # AccidentesEditCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('AccidentesEditCtrl', function ($scope, accidente_id, $uibModalInstance, 
    AccidentesService, UbicacionesService, CausasService, $uibModal, $utilsViewService,
    TipoServiciosService, TipoVehiculosService, DetalleAccidentesService, $q) {
    
    $scope.accidente = {};
    $scope.message = {};
    
    $scope.getAccidente = function() {
        AccidentesService.get({id: accidente_id}, function (data) {
            $scope.accidente = data.accidente;
            var parseDate = new Date($scope.accidente.fechaHora);
            $scope.accidente.fechaHora = parseDate;
            $scope.accidente.pre_fechaHora = $scope.accidente.fechaHora;
        });
    };
    
    $scope.getUbicaciones = function() {
        $scope.loading_ubicaciones = 'Cargando...';
        UbicacionesService.get(function (data) {
            $scope.ubicaciones = data.ubicaciones;
            $scope.loading_ubicaciones = 'Selecciona una Ubicación';
        });
    };
    
    $scope.getCausas = function() {
        $scope.loading_causas = 'Cargando...';
        CausasService.get(function (data) {
            $scope.causas = data.causas;
            $scope.loading_causas = 'Selecciona una Causa';
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
            $q.all([
                 TipoServiciosService.get({id: data.tipo_servicio_id}).$promise,
                 TipoVehiculosService.get({id: data.tipo_vehiculo_id}).$promise
            ]).then(function(data) {
                var tipo_servicio = data[0].tipo_servicio;
                var tipo_vehiculo = data[1].tipo_vehiculo;
                
                var detalle_accidente = {
                    tipo_vehiculo_id: tipo_vehiculo.id,
                    tipo_servicio_id: tipo_servicio.id,
                    tipo_vehiculo: tipo_vehiculo,
                    tipo_servicio: tipo_servicio,
                };
                $scope.accidente.detalle_accidentes.push(detalle_accidente);
            });
            
        });
    };
    
    $scope.removeDetalle = function(detalle_accidente) {
        if (confirm('¿Está seguro de eliminar este registro?')) {
            DetalleAccidentesService.remove({id: detalle_accidente.id}, function(data) {
                var index = $scope.accidente.detalle_accidentes.indexOf(detalle_accidente);
                $scope.accidente.detalle_accidentes.splice(index, 1);
            });
        }
    };
    
    $scope.saveAccidente = function(accidente, boton) {
        $utilsViewService.disable('#' + boton);
        
        if (accidente.pre_fechaHora !== null) {
            accidente.fechaHora = formatDateTime(accidente.pre_fechaHora);
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