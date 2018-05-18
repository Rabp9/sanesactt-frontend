'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UbicacionesDatosCtrl
 * @description
 * # UbicacionesDatosCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('UbicacionesDatosCtrl', function ($scope) {
    $('#nvbNavegador').css('display', 'none');
    $('body').css('padding-top', 0);
    
    $scope.labelsAnual = ['2014', '2015', '2016', '2017'];
    $scope.seriesAnual = ['Series A'];
    $scope.dataAnual = [
        [65, 59, 80, 81]
    ];
    
    $scope.labelsMensual = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    $scope.seriesMensual = ['Series A'];
    $scope.dataMensual = [
        [65, 59, 80, 81, 15, 50, 15, 15, 80, 70, 65, 15]
    ];
    
});