'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UsersLoginCtrl
 * @description
 * # UsersLoginCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('UsersLoginCtrl', function ($scope, UsersService, $cookies, $state, $rootScope, $utilsViewService) {
    $scope.message = {};
    
    $scope.loginUser = function(user, boton) {
        $('#' + boton).text('Login...');
        $utilsViewService.disable('#' + boton);
        
        var data = UsersService.login(user, function() {
            if (!data.user) {
                $scope.message = data.message;
            } else {
                $cookies.putObject('sanesactt-user', data.user);
                $cookies.put('sanesactt-token', data.token);
                $rootScope.user = data.user;
                $rootScope.logged = true;
                $state.go('main');
            }
        }, function(err) {
            $utilsViewService.enable('#' + boton);
            $('#' + boton).text('Login');
            $scope.message = err.data;
        });
    };
});