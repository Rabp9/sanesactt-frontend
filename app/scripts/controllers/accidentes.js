'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:AccidentesCtrl
 * @description
 * # AccidentesCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('AccidentesCtrl', function ($scope, AccidentesService, $uibModal, $utilsViewService) {
    
    $scope.search = {};
    $scope.search.text = '';
    $scope.search.estado_id = '1';
    $scope.page = 1;
    $scope.items_per_page = 10;

    $scope.init = function() {
        $scope.getAccidentes();
        $('#srBuscar').focus();
    };
    
    $scope.getAccidentes = function() {
        $scope.loading = true;
        AccidentesService.get({
            page: $scope.page,
            estado_id: $scope.search.estado_id,
            text: $scope.search.text,
            items_per_page: $scope.items_per_page
        }, function(data) {
            $scope.accidentes = data.accidentes;
            $scope.pagination = data.pagination;
            $scope.loading = false;
        }); 
    };
    
    $scope.$watch('search.estado_id', function(oldValue, newValue) {
        $scope.page = 1;
        $scope.getAccidentes();
    });
    
    $scope.$watch('search.text', function(oldValue, newValue) {
        $scope.page = 1;
        $scope.getAccidentes();
    });
    
    $scope.pageChanged = function() {
        $scope.getAccidentes();
    };
    
    $scope.onChangeItemsPerPage = function() {
        $scope.page = 1;
        $scope.getAccidentes();
    };
    
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
    
    $scope.showAccidentesAdd = function(event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/accidentes-add.html',
            controller: 'AccidentesAddCtrl',
            backdrop: false,
            size: 'lg'
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function(data) {
            $scope.getAccidentes();
            $scope.message = data;
        });
    };
    
    $scope.init();
});