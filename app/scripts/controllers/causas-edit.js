'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:CausasEditCtrl
 * @description
 * # CausasEditCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('CausasEditCtrl', function ($scope, $uibModalInstance, causa_id, 
    NgMap, CausasService, EnvService, $utilsViewService) {
    
    $scope.causa = {};
    $scope.message = {};
    $scope.loading = false;
    $scope.tmp_path = EnvService.getHost() + 'tmp/';
    
    $scope.getCausa = function() {
        CausasService.get({id: causa_id}, function (data) {
            $scope.causa = data.causa;
        });
    };
    
    $scope.init = function() {
        $scope.getCausa();
    };
    
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
    
    $scope.preview = function(foto, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', foto);
        
        CausasService.preview(fd, function(data) {
            $scope.causa.foto = data.filename;
            $scope.loading = false;
        });
    };
    
    $scope.saveCausa = function(causa, btn) {
        $utilsViewService.disable('#' + btn);
        
        CausasService.save(causa, function(data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init();
});