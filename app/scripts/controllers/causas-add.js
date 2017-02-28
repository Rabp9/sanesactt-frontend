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
.controller('CausasAddCtrl', function ($scope, CausasService, $uibModalInstance, causa_text) {
    $scope.causa = {};
    $scope.causa.descripcion = causa_text;
    $scope.causa.variaciones = causa_text + "; ";

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveCausa = function(causa, boton) {
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);

        CausasService.save(causa, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(data);
        });
    }
});