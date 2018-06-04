'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UbicacionesAddCtrl
 * @description
 * # UbicacionesAddCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('UbicacionesAddCtrl', function ($scope, $uibModalInstance, ubicacion_dirty, 
    NgMap, UbicacionesService, EnvService, $utilsViewService) {
    
    $scope.tmp_path = EnvService.getHost() + 'tmp/';
    $scope.loading = false;
    $scope.ubicacion = {};
    $scope.ubicacion.descripcion = ubicacion_dirty;
    $scope.ubicacion.detalle_ubicaciones = [];
    
    NgMap.getMap().then(function(map) {
        google.maps.event.trigger(map, 'resize'); 
    });
    
    $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY';
        
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
        
        ubicacion.estado_id = 1;
        UbicacionesService.save(ubicacion, function(data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init = function() {
        if (ubicacion_dirty !== undefined) {
            $scope.ubicacion.detalle_ubicaciones.push({
                descripcion: ubicacion_dirty,
                estado_id: 1
            });
        }
    };
    
    $scope.removeDetalleUbicacion = function(detalle_ubicacion) {
        var index = $scope.ubicacion.detalle_ubicaciones.indexOf(detalle_ubicacion);
        $scope.ubicacion.detalle_ubicaciones.splice(index, 1);
    };
    
    $scope.init();
});