'use strict';

/**
 * @ngdoc service
 * @name archivoDigitalFrontendApp.utilsViewService
 * @description
 * # utilsViewService
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
.factory('$utilsViewService', function () {
    return {
        enable: function(id) {
            $(id).removeClass('disabled');
            $(id).prop('disabled', false);
        },
        disable: function(id) {
            $(id).addClass('disabled');
            $(id).prop('disabled', true);
        },
        setPropertyToAllItemsOfArrayObject: function(array, property, value) {
            angular.forEach(array, function(v_array, k_array) {
                v_array[property] = value;
            });
        }
    };
});