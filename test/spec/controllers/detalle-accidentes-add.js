'use strict';

describe('Controller: DetalleAccidentesAddCtrl', function () {

  // load the controller's module
  beforeEach(module('sanesacttFrontendApp'));

  var DetalleAccidentesAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetalleAccidentesAddCtrl = $controller('DetalleAccidentesAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DetalleAccidentesAddCtrl.awesomeThings.length).toBe(3);
  });
});
