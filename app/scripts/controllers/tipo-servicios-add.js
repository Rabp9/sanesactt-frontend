'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:TipoServiciosAddCtrl
 * @description
 * # TipoServiciosAddCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('TipoServiciosAddCtrl', function ($scope, $uibModalInstance, $utilsViewService,
    TipoServiciosService) {
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveTipoServicio = function(tipo_servicio, btn) {
        $utilsViewService.disable('#' + btn);
        
        tipo_servicio.estado_id = 1;
        TipoServiciosService.save(tipo_servicio, function(data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
});