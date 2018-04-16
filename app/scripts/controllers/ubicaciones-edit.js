'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UbicacionesEditCtrl
 * @description
 * # UbicacionesEditCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('UbicacionesEditCtrl', function ($scope, $uibModalInstance, ubicacion_id, 
    NgMap, UbicacionesService, EnvService, $utilsViewService) {
    
    $scope.ubicacion = {};
    $scope.message = {};
    $scope.loading = false;
    $scope.tmp_path = EnvService.getHost() + 'tmp/';
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY";
    
    $scope.getUbicacion = function() {
        UbicacionesService.get({id: ubicacion_id}, function (data) {
            $scope.ubicacion = data.ubicacion;
        });
    };
    
    $scope.init = function() {
        $scope.getUbicacion();
    };
    
    NgMap.getMap().then(function(map) {
        google.maps.event.trigger(map, 'resize'); 
    });
    
    $scope.setMarker = function(event) {
        var ll = event.latLng;
        $scope.ubicacion.latitud = ll.lat();
        $scope.ubicacion.longitud = ll.lng();
    };
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.addVariacion = function(variacion) {
        $scope.ubicacion.detalle_ubicaciones.push({
            descripcion: variacion,
            estado_id: 1
        });
        $scope.ubicacion_variacion_nueva = '';
        $('#txtDato').focus();
    };
    
    $scope.preview = function(foto, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', foto);
        
        UbicacionesService.preview(fd, function(data) {
            $scope.ubicacion.foto = data.filename;
            $scope.loading = false;
        });
    };
    
    $scope.saveUbicacion = function(ubicacion, btn) {
        $utilsViewService.disable('#' + btn);
        
        UbicacionesService.save(ubicacion, function(data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init();
});