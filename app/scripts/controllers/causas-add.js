'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:CausasAddCtrl
 * @description
 * # CausasAddCtrl
 * Controller of the sanesacttFrontendApp
 */
angular
.module('sanesacttFrontendApp')
.controller('CausasAddCtrl', function ($scope, $uibModalInstance, causa_dirty, 
    CausasService, $utilsViewService) {
    
    $scope.loading = false;
    $scope.causa = {};
    $scope.causa.descripcion = causa_dirty;
    $scope.causa.detalle_causas = [];
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.addVariacion = function(variacion) {
        $scope.causa.detalle_causas.push({
            descripcion: variacion,
            estado_id: 1
        });
        $scope.causa_variacion_nueva = '';
        $('#txtDato').focus();
    };
        
    $scope.saveCausa = function(causa, btn) {
        $utilsViewService.disable('#' + btn);
        
        CausasService.save(causa, function(data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init = function() {
        if (causa_dirty !== undefined) {
            $scope.causa.detalle_causas.push({
                descripcion: causa_dirty,
                estado_id: 1
            });
        }
    };
    
    $scope.removeDetalleCausa = function(detalle_causa) {
        var index = $scope.causa.detalle_causas.indexOf(detalle_causa);
        $scope.causa.detalle_causas.splice(index, 1);
    };
    
    $scope.init();
});