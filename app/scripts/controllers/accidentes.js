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
    AccidentesService.get(function(data) {
        $scope.accidentes = data.accidentes;
    });
    
    $scope.menuOptions = [
        ['<span class="glyphicon glyphicon-pencil"></span> Editar Accidente', function ($itemScope, $event, modelValue, text, $li) {
            var modalInstanceAdd = $uibModal.open({
                templateUrl: 'views/accidentes-edit.html',
                controller: 'AccidentesEditCtrl',
                backdrop: false,
                size: 'lg',
                resolve: {
                    accidente_id: function() {
                        return $itemScope.accidente.id;
                    }
                }
            });

            modalInstanceAdd.result.then(function (data) {
                $scope.message = data.message;
            });
        }]
    ];
});