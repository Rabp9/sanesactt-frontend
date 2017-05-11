'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UbicacionesAddCtrl
 * @description
 * # UbicacionesAddCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('UbicacionesAddCtrl', function ($scope, $uibModalInstance, ubicacion_dirty) {
    $scope.ubicacion = {};

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    console.log(ubicacion_dirty);
    $scope.ubicacion.descripcion = ubicacion_dirty;
});