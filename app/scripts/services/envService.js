'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.envService
 * @description
 * # envService
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
.factory('EnvService', function () {
    return {
        getHost: function() {
            switch (window.location.hostname) {
                case 'localhost':
                    return 'http://localhost:8000/sanesactt-backend/';
            }
        }
    };
});