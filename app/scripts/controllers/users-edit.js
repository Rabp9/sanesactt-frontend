'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UsersEditCtrl
 * @description
 * # UsersEditCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('UsersEditCtrl', function ($scope, user_id, $uibModalInstance, UsersService, 
    RolesService, $utilsViewService, RolUsersService) {
        
    $scope.rol_user = {};
    
    $scope.init = function() {
        $scope.getUsers(user_id);
        $scope.getRoles();
    };
    
    $scope.getUsers = function() {
        $scope.loading = true;
        UsersService.get({id: user_id}, function(data) {
            $scope.user_edit = data.user;
            if ($scope.user_edit.rol_user) {
                $scope.rol_user.id = data.user.rol_user.id;
            }
            $scope.rol_user.user_id = data.user.PerCod;
            $scope.loading = false;
        });
    };
    
    $scope.getRoles = function() {
        $scope.loading_roles = "Cargando...";
        RolesService.getAdmin(function(data) {
            $scope.roles = data.roles;
            $scope.loading_roles = "Selecciona un Rol";
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveRolUser = function(rol_user, boton) {
        $utilsViewService.disable('#' + boton);
        RolUsersService.save(rol_user, function(data) {
            $uibModalInstance.close(data);
        }, function(err) {
            $uibModalInstance.close(err.data); 
        });
    };
    
    $scope.init();
});