'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('UploadCtrl', function ($scope, AccidentesService, UbicacionesService, CausasService, $uibModal) {
    $scope.uploadFile = function(csv, errFiles) {
        var fd = new FormData();
        fd.append('file', csv);
        
        AccidentesService.load(fd, function(data) {
            $scope.accidentes = data.accidentes;
        });
    };
});