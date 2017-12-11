'use strict';

describe('Controller: TipoVehiculosAddCtrl', function () {

  // load the controller's module
  beforeEach(module('sanesacttFrontendApp'));

  var TipoVehiculosAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TipoVehiculosAddCtrl = $controller('TipoVehiculosAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TipoVehiculosAddCtrl.awesomeThings.length).toBe(3);
  });
});
