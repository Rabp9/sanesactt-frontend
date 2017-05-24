'use strict';

/**
 * @ngdoc filter
 * @name sanesacttFrontendApp.filter:searchTextFilter
 * @function
 * @description
 * # searchTextFilter
 * Filter in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
.filter('searchTextFilter', function () {
    return function(input, searchText, excluded) {
        if (!input) {
            return input;
        }
        if (!searchText) {
            return input;
        }
        var result = [];
        excluded.push('$$hashKey');
        angular.forEach(input, function (v_input, k_input) {
            var seguir = true;
            angular.forEach(v_input, function (v_property, k_property) {
                if (seguir) {
                    if (excluded.indexOf(k_property) === -1) {
                        var propiedad = '' + v_property;
                        if (propiedad.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                            result.push(v_input);
                            seguir = false;
                        }
                    }
                }
            });
        });
        return result;
    };
});