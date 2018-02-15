'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:AccidentesCtrl
 * @description
 * # AccidentesCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('AccidentesCtrl', function ($scope, AccidentesService, $uibModal) {
    $scope.getAccidentes = function() {
        $scope.loading = true;
        AccidentesService.get(function(data) {
            $scope.accidentes = data.accidentes;
            $scope.loading = false;
        }); 
    };
    
    $scope.init = function() {
        $scope.getAccidentes();
        $('#srBuscar').focus();
    };
    
    $scope.menuOptions = [
        ['<span class="glyphicon glyphicon-pencil"></span> Editar Accidente', function ($itemScope, $event, modelValue, text, $li) {
            var modalInstanceAdd = $uibModal.open({
                templateUrl: 'views/accidentes-edit.html',
                controller: 'AccidentesEditCtrl',
                backdrop: false,
                size: 'lg',
                resolve: {
                    accidente_nro_id: function() {
                        return $itemScope.accidente.nro_id;
                    },
                    accidente_anio: function() {
                        return $itemScope.accidente.anio;
                    }
                }
            });

            modalInstanceAdd.result.then(function (data) {
                $scope.message = data.message;
            });
        }]
    ];
    
    $scope.init();
});