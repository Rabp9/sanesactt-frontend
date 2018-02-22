'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:TipoVehiculosAddCtrl
 * @description
 * # TipoVehiculosAddCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('TipoVehiculosAddCtrl', function ($scope, $uibModalInstance, $utilsViewService,
    TipoVehiculosService) {
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveTipoVehiculo = function(tipo_vehiculo, btn) {
        $utilsViewService.disable('#' + btn);
        
        tipo_vehiculo.estado_id = 1;
        TipoVehiculosService.save(tipo_vehiculo, function(data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
});