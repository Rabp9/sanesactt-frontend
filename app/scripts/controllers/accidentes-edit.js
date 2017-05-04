'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:AccidentesEditCtrl
 * @description
 * # AccidentesEditCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('AccidentesEditCtrl', function ($scope, accidente, $uibModalInstance, 
    AccidentesService, UbicacionesService, CausasService, $uibModal) {
    $scope.accidente = $.extend(true, {}, accidente);
    
    UbicacionesService.get(function (data) {
        $scope.ubicaciones = data.ubicaciones;
    });
    
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
    
    $scope.showUbicacionesAdd = function(event, ubicacion_dirty) {
        console.log(ubicacion_dirty);
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
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
        
        modalInstanceAdd.result.then(function (data) {
            $scope.ambientes.push(data.ambiente);
            $scope.message = data.message;
        });
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
    
});