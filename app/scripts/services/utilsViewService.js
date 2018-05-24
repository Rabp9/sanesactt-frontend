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
        formatDate: function(fecha) {
            if (fecha === undefined) {
                return undefined;
            }
            return fecha.getFullYear() + '-' + this.str_pad((fecha.getMonth() + 1), '00') + '-' + this.str_pad(fecha.getDate(), '00');
        },
        str_pad: function(str, pad) {
            return pad.substring(0, (pad.length - str.toString().length)) + str;
        },
        setPropertyToAllItemsOfArrayObject: function(array, property, value) {
            angular.forEach(array, function(v_array, k_array) {
                v_array[property] = value;
            });
        }
    };
});