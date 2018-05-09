'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:RolesAddCtrl
 * @description
 * # RolesAddCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('RolesAddCtrl', function ($scope, RolesService, $uibModalInstance, 
ControllersService, $utilsViewService) {
    
    $scope.rol = {};
    $scope.rol.controller_roles = [];
    
    $scope.loading = true;
    ControllersService.get(function(data) {
        $scope.rol.controller_roles = [];
        angular.forEach(data.controllers, function(value, key) {
            $scope.rol.controller_roles.push({
                controller_id: value.id,
                controller: value,
                permiso: false
            });
        });
        $scope.loading = false;
    });
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveRol = function(rol, boton) {
        $utilsViewService.disable('#' + boton);
        
        rol.estado_id = 1;
        RolesService.save(rol, function(data) {
            $uibModalInstance.close(data);
        }, function(err) {
            $uibModalInstance.close(err.data);
        });
    };
});