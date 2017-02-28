'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UploadCtrl
 * @description
 * # UbicacionesAddCtrl
 * Controller of the sanesacttFrontendApp
 */
angular
.module('sanesacttFrontendApp')
.controller('UbicacionesAddCtrl', function ($scope, UbicacionesService, $uibModalInstance, ubicacion_text) {
    $scope.ubicacion = {};
    $scope.ubicacion.descripcion = ubicacion_text;
    $scope.ubicacion.variaciones = ubicacion_text + "; ";

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveUbicacion = function(ubicacion, boton) {
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);

        UbicacionesService.save(ubicacion, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(data);
        });
    }
});