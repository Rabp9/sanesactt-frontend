'use strict';

/**
 * @ngdoc service
 * @name sanesacttFrontendApp.oauthhttpinterceptor
 * @description
 * # oauthhttpinterceptor
 * Factory in the sanesacttFrontendApp.
 */
angular.module('sanesacttFrontendApp')
  .factory('oauthHttpInterceptor', function ($cookies) {
    return {
        request: function (config) {
            config.headers.Authorization = 'Bearer ' + $cookies.get('sanesactt-token');
            return config;
        }
    };
});