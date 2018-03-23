'use strict';

describe('Controller: CausasCtrl', function () {

  // load the controller's module
  beforeEach(module('sanesacttFrontendApp'));

  var CausasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CausasCtrl = $controller('CausasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CausasCtrl.awesomeThings.length).toBe(3);
  });
});
