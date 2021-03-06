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
    'checklist-model',
    'ui.bootstrap.contextMenu',
    'ngMap',
    'angularValidator',
    'scrollable-table',
    'chart.js'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider, ChartJsProvider) {
    $httpProvider.interceptors.push('oauthHttpInterceptor');
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
    
    var ubicacionesState = {
        name: 'ubicaciones',
        url: '/ubicaciones',
        templateUrl: 'views/ubicaciones.html',
        controller: 'UbicacionesCtrl',
        controllerAs: 'ubicaciones',
        title: 'Ubicaciones'
    };
    
    var causasState = {
        name: 'causas',
        url: '/causas',
        templateUrl: 'views/causas.html',
        controller: 'CausasCtrl',
        controllerAs: 'causas',
        title: 'Causas'
    };
    
    var mapaState = {
        name: 'mapa',
        url: '/mapa',
        templateUrl: 'views/mapa.html',
        controller: 'MapaCtrl',
        controllerAs: 'mapa',
        title: 'Mapa'
    };
    
    var rolesState = {
        name: 'roles',
        url: '/roles',
        templateUrl: 'views/roles.html',
        controller: 'RolesCtrl',
        controllerAs: 'roles',
        title: 'Roles'
    };
    
    var usersLoginState = {
        name: 'usersLogin',
        url: '/users/login',
        templateUrl: 'views/users-login.html',
        controller: 'UsersLoginCtrl',
        controllerAs: 'usersLogin',
        title: 'Login'
    };
    
    var usersState = {
        name: 'users',
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'users',
        title: 'Usuarios'
    };
    
    var ubicacionesDatosState = {
        name: 'ubicacionesDatos',
        url: '/ubicaciones/datos/:ubicacion_id',
        templateUrl: 'views/ubicaciones-datos.html',
        controller: 'UbicacionesDatosCtrl',
        controllerAs: 'ubicacionesDatos',
        title: 'Datos de Ubicación'
    };
    
    $stateProvider.state(mainState);
    $stateProvider.state(uploadState);
    $stateProvider.state(accidentesState);
    $stateProvider.state(ubicacionesState);
    $stateProvider.state(causasState);
    $stateProvider.state(mapaState);
    $stateProvider.state(rolesState);
    $stateProvider.state(usersLoginState);
    $stateProvider.state(usersState);
    $stateProvider.state(ubicacionesDatosState);
    $urlRouterProvider.when('', '/');
    
    // Configure all charts
    ChartJsProvider.setOptions({
        chartColors: ['#003053', '#51BAEB', '#004272', '#0077B2'],
        responsive: true
    });
    
    // Configure all line charts
    ChartJsProvider.setOptions('bar', {
        showLines: true
    });
}).run(function($rootScope, $state, $window, $interval, $timeout, $cookies, $location) {
    
    $rootScope.logged = false;
    if ($cookies.get('sanesactt-token')) {
        $rootScope.logged = true;
        $rootScope.user = $cookies.getObject('sanesactt-user');
    } else {
        $rootScope.logged = false;
    }
    
    $rootScope.$state = $state;
    
   
    $rootScope.$on('$stateChangeSuccess', function(event, toParams, fromState, fromParams) {
        $rootScope.title = $state.current.title;
        $window.scrollTo(0, 0);
    });
    
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (!$rootScope.logged) {
            if (toState.name !== 'usersLogin') {
                $location.path('/users/login');
            }
        } else {
            if ($rootScope.user.rol_user.rol.permisos.search(toState.controllerAs) >= 0) {
                $rootScope.message_root = null;
                if (toState.controllerAs === 'ubicacionesDatos') {
                    $('#nvbNavegador').css('display', 'none');
                    $('body').css('padding-top', 0);
                    $('#dvContainer').removeClass('container');
                    $('#dvContainer').addClass('container-fluid');
                } else {
                    $('#nvbNavegador').css('display', 'block');
                    $('body').css('padding-top', '50px');
                    $('#dvContainer').removeClass('container-fluid');
                    $('#dvContainer').addClass('container');
                }
            } else {
                if (toState.controllerAs !== 'main' && toState.controllerAs !== 'usersLogin') {
                    event.preventDefault();
                    $rootScope.message_root = {
                        type: 'error',
                        text: 'No tiene permisos'
                    };
                }
            }
        }
    });
    
    $rootScope.logout = function() {
        if (confirm('¿Está seguro de cerrar sesión?')) {
            $cookies.remove('sanesactt-user');
            $cookies.remove('sanesactt-token');
            $rootScope.user = undefined;
            $rootScope.logged = false;
            $state.go('usersLogin');
        }
    };
});