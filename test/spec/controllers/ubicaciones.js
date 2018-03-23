'use strict';

describe('Controller: UbicacionesCtrl', function () {

  // load the controller's module
  beforeEach(module('sanesacttFrontendApp'));

  var UbicacionesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UbicacionesCtrl = $controller('UbicacionesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UbicacionesCtrl.awesomeThings.length).toBe(3);
  });
});
