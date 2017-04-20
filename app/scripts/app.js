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
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFileUpload',
    'ui.grid',
    'ui.grid.cellNav',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.resizeColumns',
    'ui.bootstrap',
    'angular-search-and-select',
    "checklist-model"
])
.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
            controllerAs: 'about'
        })
        .when('/upload', {
            templateUrl: 'views/upload.html',
            controller: 'UploadCtrl',
            controllerAs: 'upload'
        })
        .when('/causas-add', {
          templateUrl: 'views/causas-add.html',
          controller: 'CausasAddCtrl',
          controllerAs: 'causasAdd'
        })
        .when('/accidentes', {
          templateUrl: 'views/accidentes.html',
          controller: 'AccidentesCtrl',
          controllerAs: 'accidentes'
        })
        .otherwise({
            redirectTo: '/'
        });
})
.path_location = 'http://localhost:8000/sanesactt-backend/';