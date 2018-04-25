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
    NgMap, UbicacionesService, EnvService, $utilsViewService, DetalleUbicacionesService) {
    
    $scope.ubicacion = {};
    $scope.message = {};
    $scope.loading = false;
    $scope.loading_foto = false;
    $scope.tmp_path = EnvService.getHost() + 'img' + '/ubicaciones';
    var tmp_path = EnvService.getHost() + 'tmp/';
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY";
    var changed = false;
    
    $scope.getUbicacion = function() {
        UbicacionesService.get({id: ubicacion_id}, function (data) {
            $scope.ubicacion = data.ubicacion;
            $scope.foto_preview = $scope.ubicacion.foto;
            $scope.ubicacion.foto = null;
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
        if (errFiles.length) {
            if (errFiles[0].$errorMessages.maxSize) {
                alert('La imagen sobrepasa los 10 MB');
                return;
            }
        }
        $scope.loading_foto = true;
        var fd = new FormData();
        fd.append('file', foto);
        
        UbicacionesService.preview(fd, function(data) {
            $scope.foto_preview = data.filename;
            $scope.ubicacion.foto = null;
            $scope.loading_foto = false;
            $scope.tmp_path = tmp_path;
            changed = true;
        }, function(err) {
            $scope.foto_preview = null;
            $scope.loading_foto = false;
        });
    };
    
    $scope.saveUbicacion = function(ubicacion, btn, foto_preview) {
        $utilsViewService.disable('#' + btn);
        
        if (changed) {
            if (foto_preview !== null) {
                ubicacion.foto = foto_preview;
            }
        }
        
        UbicacionesService.save(ubicacion, function(data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.removeDetalleUbicacion = function(detalle_ubicacion) {
        if (detalle_ubicacion.id === undefined) {
            var index = $scope.ubicacion.detalle_ubicaciones.indexOf(detalle_ubicacion);
            $scope.ubicacion.detalle_ubicaciones.splice(index, 1);
            return;
        }
        if (confirm('¿Está seguro de eliminar este registro?')) {
            DetalleUbicacionesService.remove({id: detalle_ubicacion.id}, function(data) {
                console.log(data);
                var index = $scope.ubicacion.detalle_ubicaciones.indexOf(detalle_ubicacion);
                $scope.ubicacion.detalle_ubicaciones.splice(index, 1);
            });
        }
    };
    
    $scope.init();
});