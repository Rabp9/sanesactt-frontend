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
    $scope.search.estado_1 = true;
    $scope.search.estado_2 = false;
    $scope.search.estado_3 = false;
    $scope.search.estado_4 = false;
    $scope.page = 1;
    $scope.items_per_page = 10;
    $scope.check_all_estados_list = {
        value: false
    };

    $scope.init = function() {
        $scope.getAccidentes();
        $('#srBuscar').focus();
    };
    
    $scope.getAccidentes = function() {
        $scope.loading = true;
        AccidentesService.get({
            page: $scope.page,
            estados_id: $scope.search.estados_id,
            text: $scope.search.text,
            items_per_page: $scope.items_per_page,
            estado_1: $scope.search.estado_1,
            estado_2: $scope.search.estado_2,
            estado_3: $scope.search.estado_3,
            estado_4: $scope.search.estado_4
        }, function(data) {
            $scope.accidentes = data.accidentes;
            $scope.pagination = data.pagination;
            $scope.loading = false;
        }); 
    };
   
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
    
    $scope.check_all_list_event = function() {
        if ($scope.search.check_all) {
            $scope.search.estado_1 = true;
            $scope.search.estado_2 = true;
            $scope.search.estado_3 = true;
            $scope.search.estado_4 = true;
        } else {
            $scope.search.estado_1 = true;
            $scope.search.estado_2 = false;
            $scope.search.estado_3 = false;
            $scope.search.estado_4 = false;
        }
        $scope.page = 1;
        $scope.getAccidentes();
    };
    
    $scope.check_change = function() {
        $scope.page = 1;
        $scope.getAccidentes();        
    };
   
    $scope.init();
});