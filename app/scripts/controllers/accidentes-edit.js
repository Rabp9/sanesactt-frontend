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
    
    var accidente = AccidentesService.getByNroIdNAnio({
        nro_id: accidente_nro_id,
        anio: accidente_anio
    }, function () {
        $scope.accidente = accidente.accidente;
    }, function (err) {
        $scope.message = err.data;
    });
        
    UbicacionesService.get(function (data) {
        $scope.ubicaciones = data.ubicaciones;
    });
    /*
    CausasService.get(function (data) {
        $scope.causas = data.causas;
    });
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.savePage = function (page, boton) {
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        AccidentesService.save(page, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(data);
        });
    };
    */
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
            /*$scope.ambientes.push(data.ambiente);
            $scope.message = data.message;*/
        });
    };
    
});