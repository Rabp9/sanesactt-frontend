'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:MapaCtrl
 * @description
 * # MapaCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('MapaCtrl', function ($scope, NgMap, UbicacionesService) {
    $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY';
    $scope.loading_puntos_negros = true;
    $scope.limite = 5;

    NgMap.getMap().then(function(map) {
        $scope.map = map;
        google.maps.event.trigger(map, 'resize'); 
    });
    
    $scope.init = function() {
        $scope.loading_puntos_negros = false;
    };
    
    $scope.getPuntosNegros = function(limite, fecha_inicio, fecha_cierre) {
        UbicacionesService.getPuntosNegros({
            limite: limite,
            fecha_inicio: fecha_inicio,
            fecha_cierre: fecha_cierre
        }, function(data) {
            $scope.puntos_negros = data.ubicaciones;
            
            $scope.ubicacion_lat = data.ubicaciones[0].latitud;
            $scope.ubicacion_lng = data.ubicaciones[0].longitud;
        });
    };
   
    $scope.init();
});