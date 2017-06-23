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
    CausasService, EnvService, $utilsViewService) {
    
    $scope.loading = false;
    $scope.causa = {};
    $scope.causa.descripcion = causa_dirty;
    $scope.causa.detalle_causas = [];
    $scope.causa.detalle_causas.push({
        descripcion: causa_dirty,
        estado_id: 1
    });
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.addVariacion = function(variacion) {
        $scope.causa.detalle_causas.push({
            descripcion: variacion,
            estado_id: 1
        });
        $scope.causa_variacion_nueva = '';
    };
        
    $scope.saveCausa = function(causa, btn) {
        $utilsViewService.disable('#' + btn);
        
        CausasService.save(causa, function(data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
});