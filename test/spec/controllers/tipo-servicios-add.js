'use strict';

describe('Controller: TipoServiciosAddCtrl', function () {

  // load the controller's module
  beforeEach(module('sanesacttFrontendApp'));

  var TipoServiciosAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TipoServiciosAddCtrl = $controller('TipoServiciosAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TipoServiciosAddCtrl.awesomeThings.length).toBe(3);
  });
});
