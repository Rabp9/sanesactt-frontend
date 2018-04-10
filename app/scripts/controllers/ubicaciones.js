'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UbicacionesCtrl
 * @description
 * # UbicacionesCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('UbicacionesCtrl', function ($scope, UbicacionesService, $uibModal, $utilsViewService) {
    
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
        $scope.getUbicaciones();
        $('#srBuscar').focus();
    };
    
    $scope.getUbicaciones = function() {
        $scope.loading = true;
        UbicacionesService.get({
            page: $scope.page,
            text: $scope.search.text,
            items_per_page: $scope.items_per_page,
            estado_1: $scope.search.estado_1,
            estado_2: $scope.search.estado_2
        }, function(data) {
            $scope.ubicaciones = data.ubicaciones;
            $scope.pagination = data.pagination;
            $scope.loading = false;
        }); 
    };
   
    $scope.$watch('search.text', function(oldValue, newValue) {
        $scope.page = 1;
        $scope.getUbicaciones();
    });
    
    $scope.pageChanged = function() {
        $scope.getUbicaciones();
    };
    
    $scope.onChangeItemsPerPage = function() {
        $scope.page = 1;
        $scope.getUbicaciones();
    };
    
    $scope.menuOptions = [
        ['<span class="glyphicon glyphicon-pencil"></span> Editar Ubicación', function ($itemScope, $event, modelValue, text, $li) {
            var modalInstanceEdit = $uibModal.open({
                templateUrl: 'views/ubicaciones-edit.html',
                controller: 'UbicacionesEditCtrl',
                backdrop: false,
                size: 'lg',
                resolve: {
                    ubicacion_id: function() {
                        return $itemScope.ubicacion.id;
                    }
                }
            });

            modalInstanceEdit.result.then(function (data) {
                $scope.getUbicaciones();
                $scope.message = data.message;
            });
        }]
    ];
    
    $scope.showUbicacionesAdd = function(event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/ubicaciones-add.html',
            controller: 'UbicacionesAddCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                ubicacion_dirty: function() {
                    return undefined;
                }
            }
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function(data) {
            $scope.getUbicaciones();
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
        $scope.getUbicaciones();
    };
    
    $scope.check_change = function() {
        $scope.page = 1;
        $scope.getUbicaciones();        
    };
   
    $scope.init();
});