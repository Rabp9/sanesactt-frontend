'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.detalleAccidentesService
 * @description
 * # detalleAccidentesService
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
  .factory('DetalleAccidentesService', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
