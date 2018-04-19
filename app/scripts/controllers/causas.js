'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:CausasCtrl
 * @description
 * # CausasCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('CausasCtrl', function ($scope, CausasService, $uibModal, $utilsViewService) {
    
    $scope.search = {};
    $scope.search.text = '';
    $scope.search.estado_1 = true;
    $scope.search.estado_2 = false;
    $scope.page = 1;
    $scope.items_per_page = 10;
    $scope.check_all_estados_list = {
        value: false
    };

    $scope.init = function() {
        $scope.getCausas();
        $('#srBuscar').focus();
    };
    
    $scope.getCausas = function() {
        $scope.loading = true;
        CausasService.get({
            page: $scope.page,
            text: $scope.search.text,
            items_per_page: $scope.items_per_page,
            estado_1: $scope.search.estado_1,
            estado_2: $scope.search.estado_2
        }, function(data) {
            $scope.causas = data.causas;
            $scope.pagination = data.pagination;
            $scope.loading = false;
        }); 
    };
   
    $scope.$watch('search.text', function(oldValue, newValue) {
        $scope.page = 1;
        $scope.getCausas();
    });
    
    $scope.pageChanged = function() {
        $scope.getCausas();
    };
    
    $scope.onChangeItemsPerPage = function() {
        $scope.page = 1;
        $scope.getCausas();
    };
    
    $scope.menuOptions = [
        ['<span class="glyphicon glyphicon-pencil"></span> Editar Causa', function ($itemScope, $event, modelValue, text, $li) {
            var modalInstanceEdit = $uibModal.open({
                templateUrl: 'views/causas-edit.html',
                controller: 'CausasEditCtrl',
                backdrop: false,
                size: 'lg',
                resolve: {
                    causa_id: function() {
                        return $itemScope.causa.id;
                    }
                }
            });

            modalInstanceEdit.result.then(function (data) {
                $scope.getCausas();
                $scope.message = data;
            });
        }]
    ];
    
    $scope.showCausasAdd = function(event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/causas-add.html',
            controller: 'CausasAddCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                causa_dirty: function() {
                    return undefined;
                }
            }
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function(data) {
            $scope.getCausas();
            $scope.message = data;
        });
    };
    
    $scope.check_all_list_event = function() {
        if ($scope.search.check_all) {
            $scope.search.estado_1 = true;
            $scope.search.estado_2 = true;
        } else {
            $scope.search.estado_1 = true;
            $scope.search.estado_2 = false;
        }
        $scope.page = 1;
        $scope.getCausas();
    };
    
    $scope.check_change = function() {
        $scope.page = 1;
        $scope.getCausas();        
    };
   
    $scope.init();
});