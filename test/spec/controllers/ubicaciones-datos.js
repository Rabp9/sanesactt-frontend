'use strict';

describe('Controller: UbicacionesDatosCtrl', function () {

  // load the controller's module
  beforeEach(module('sanesacttFrontendApp'));

  var UbicacionesDatosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UbicacionesDatosCtrl = $controller('UbicacionesDatosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UbicacionesDatosCtrl.awesomeThings.length).toBe(3);
  });
});
