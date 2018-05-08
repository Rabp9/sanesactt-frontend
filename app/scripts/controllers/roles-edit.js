'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:RolesEditCtrl
 * @description
 * # RolesEditCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('RolesEditCtrl', function ($scope, rol_id, $uibModalInstance, RolesService, $utilsViewService) {
    RolesService.get({id: rol_id}, function(data) {
        $scope.rol = data.rol;
    });

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveRol = function(rol, boton) {
        $utilsViewService.disable('#' + boton);
        
        RolesService.save(rol, function(data) {
            $uibModalInstance.close(data);
        }, function(err) {
            $uibModalInstance.close(err.data);
        });
    };
});