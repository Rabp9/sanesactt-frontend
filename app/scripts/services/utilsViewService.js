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
        },
        getMaxValue: function(array) {
            if (array.length === 0) {
                return null;
            }
            if (array.length === 1) {
                return array[0];
            }
            var max = array[0];
            
            angular.forEach(array, function(v_array, k_array) {
                if (v_array > max) {
                    max = v_array;
                }
            });
            return max;
        },
        getMaxIndexes: function(array) {
            var max = this.getMaxValue(array);
            var indexes = [];
            angular.forEach(array, function(v_array, k_array) {
                if (v_array === max) {
                    indexes.push(k_array);
                }
            });
            return indexes;
        }
    };
});