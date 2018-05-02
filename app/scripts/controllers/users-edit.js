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
        
    $scope.loading = true;
    $scope.rol_user = {};
    
    UsersService.get({id: user_id}, function(data) {
        $scope.user = data.user;
        if ($scope.user.rol_user) {
            $scope.rol_user.id = data.user.rol_user.id;
        }
        $scope.rol_user.user_id = data.user.PerCod;
    });
    
    RolesService.get(function(data) {
        $scope.roles = data.roles;
        $scope.loading = false;
    });
    
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
});