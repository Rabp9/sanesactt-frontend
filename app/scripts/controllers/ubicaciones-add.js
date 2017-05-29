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
    NgMap) {
    $scope.ubicacion = {};
    $scope.ubicacion.descripcion = ubicacion_dirty;

    NgMap.getMap().then(function(map) {
        google.maps.event.trigger(map, 'resize'); 
    });
    
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY";
        
    $scope.setMarker = function(event) {
        var ll = event.latLng;
        $scope.ubicacion.latitud = ll.lat();
        $scope.ubicacion.longitud = ll.lng();
    };
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});