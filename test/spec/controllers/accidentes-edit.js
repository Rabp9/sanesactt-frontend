'use strict';

describe('Controller: AccidentesEditCtrl', function () {

  // load the controller's module
  beforeEach(module('sanesacttFrontendApp'));

  var AccidentesEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccidentesEditCtrl = $controller('AccidentesEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AccidentesEditCtrl.awesomeThings.length).toBe(3);
  });
});
