'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:AccidentesEditCtrl
 * @description
 * # AccidentesEditCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('AccidentesEditCtrl', function ($scope, accidente, $uibModalInstance, AccidentesService, UbicacionesService) {
    $scope.accidente = $.extend(true, {}, accidente)
    
    UbicacionesService.get(function(data) {
        $scope.ubicaciones = data.ubicaciones;
    })
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.savePage = function(page, boton) {
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        AccidentesService.save(page, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(data);
        });
    };
});