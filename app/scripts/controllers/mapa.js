'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:MapaCtrl
 * @description
 * # MapaCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('MapaCtrl', function ($scope, NgMap, UbicacionesService, EnvService) {
    $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY';
    $scope.loading_puntos_negros = true;
    $scope.limite = 3;
    $scope.pathLocation = EnvService.getHost() + "ubicaciones/puntos_negros/";

    NgMap.getMap().then(function(map) {
        $scope.map = map;
        google.maps.event.trigger(map, 'resize'); 
    });
    
    $scope.init = function() {
        $scope.loading_puntos_negros = false;
        var date = new Date();
        $scope.fecha_inicio = new Date(date.getFullYear() -5, '00');
        $scope.fecha_cierre = date;
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
            
            if ($scope.puntos_negros.length === 1) {
                $scope.include_markers = false;
            } else {
                $scope.include_markers = true;
            }
        });
    };
   
    $scope.showUbicacion = function(event, ubicacion) {
        $scope.selectedUbicacion = ubicacion;
        $scope.map.showInfoWindow('myInfoWindow', this);
    };

    $scope.init();
});