'use strict';

describe('Controller: CausasAddCtrl', function () {

  // load the controller's module
  beforeEach(module('sanesacttFrontendApp'));

  var CausasAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CausasAddCtrl = $controller('CausasAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CausasAddCtrl.awesomeThings.length).toBe(3);
  });
});
