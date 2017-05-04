'use strict';

describe('Controller: UbicacionesAddCtrl', function () {

  // load the controller's module
  beforeEach(module('sanesacttFrontendApp'));

  var UbicacionesAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UbicacionesAddCtrl = $controller('UbicacionesAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UbicacionesAddCtrl.awesomeThings.length).toBe(3);
  });
});
