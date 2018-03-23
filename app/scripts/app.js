.when('/causas', {
  templateUrl: 'views/causas.html',
  controller: 'CausasCtrl',
  controllerAs: 'causas'
})
.when('/ubicaciones', {
  templateUrl: 'views/ubicaciones.html',
  controller: 'UbicacionesCtrl',
  controllerAs: 'ubicaciones'
})
'use strict';

/**
 * @ngdoc overview
 * @name sanesacttFrontendApp
 * @description
 * # sanesacttFrontendApp
 *
 * Main module of the application.
 */
angular
.module('sanesacttFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngFileUpload',
    'ui.grid',
    'ui.grid.cellNav',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.resizeColumns',
    'ui.bootstrap',
    "checklist-model",
    'ui.bootstrap.contextMenu',
    'ngMap',
    'angularValidator'
])
.config(function($stateProvider, $urlRouterProvider) {
    var mainState = {
        name: 'main',
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        title: 'Home'
    };
    
    var uploadState = {
        name: 'upload',
        url: '/upload',
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl',
        controllerAs: 'upload',
        title: 'Subir'
    };
    
    var accidentesState = {
        name: 'accidentes',
        url: '/accidentes',
        templateUrl: 'views/accidentes.html',
        controller: 'AccidentesCtrl',
        controllerAs: 'accidentes',
        title: 'Accidentes'
    };
    
    var mapaState = {
        name: 'mapa',
        url: '/mapa',
        templateUrl: 'views/mapa.html',
        controller: 'MapaCtrl',
        controllerAs: 'mapa',
        title: 'Mapa'
    };
    
    $stateProvider.state(mainState);
    $stateProvider.state(uploadState);
    $stateProvider.state(accidentesState);
    $stateProvider.state(mapaState);
    $urlRouterProvider.when('', '/');
});