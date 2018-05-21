'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UbicacionesDatosCtrl
 * @description
 * # UbicacionesDatosCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('UbicacionesDatosCtrl', function ($scope, NgMap, UbicacionesService) {
    $('#nvbNavegador').css('display', 'none');
    $('body').css('padding-top', 0);
    $('#dvContainer').removeClass('container');
    $('#dvContainer').addClass('container-fluid');
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3iXCosOm01j8X97QyrYYGfGRRRuyMFY";
    
    $scope.labelsAnual = ['2014', '2015', '2016', '2017'];
    $scope.seriesAnual = ['Frecuencia Anual'];
    $scope.dataAnual = [
        [65, 59, 80, 81]
    ];
    
    $scope.labelsMensual = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    $scope.seriesMensual = ['Frecuencia Mensual'];
    $scope.dataMensual = [
        [65, 59, 80, 81, 15, 50, 15, 15, 80, 70, 65, 15]
    ];
    
    $scope.labelsDiaria = ['Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.', 'Dom.'];
    $scope.seriesDiaria = ['Frecuencia Diaria'];
    $scope.dataDiaria = [
        [65, 59, 80, 81, 15, 50, 15]
    ];
    
    $scope.labelsTipoServicio = ['No Identificado', 'Transporte Privado', 'Transporte Público'];
    $scope.seriesTipoServicio = ['Tipo de Servicio'];
    $scope.dataTipoServicio = [
        [65, 59, 80]
    ];
    
    $scope.labelsATHora = ['Madrugada', 'Mañana', 'Tarde', 'Noche'];
    $scope.seriesATHora = ['Frecuencia de AT por hora'];
    $scope.dataATHora = [
        [65, 59, 80, 15]
    ];
    
    $scope.labelsConsInvolucrado = ['Ilesos', 'Heridos', 'Fallecidos'];
    $scope.seriesConsInvolucrado = ['Consecuencias por Involucrado'];
    $scope.dataConsInvolucrado = [
        [65, 59, 80]
    ];
    
    $scope.labelsTipoVehiculo = ['Moto Lineal', 'Camión', 'Ómnibus Urbano', 'Camioneta Rural', 'Camioneta pick up', 'Station wagon', 'Automóvil'];
    $scope.seriesTipoVehiculo = ['Vehículos Involucrados'];
    $scope.dataTipoVehiculo = [
        [65, 59, 80, 15, 65, 18, 14]
    ];
    
    $scope.labelsCausa = ['Desacato a la señal de tránsito por el peatón', 'Invasión del carril /maniobras no permitidas'];
    $scope.seriesCausa = ['Causas Asociadas'];
    $scope.dataCausa = [
        [156, 210]
    ];
    
    $scope.getUbicacion = function() {
        /*
        UbicacionesService.get({id: ubicacion_id}, function (data) {
            $scope.ubicacion = data.ubicacion;
            $scope.foto_preview = $scope.ubicacion.foto;
            $scope.ubicacion.foto = null;
        });
        */
    };
    
    NgMap.getMap().then(function(map) {
        google.maps.event.trigger(map, 'resize'); 
    });
});