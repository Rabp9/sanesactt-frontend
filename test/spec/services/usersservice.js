'use strict';

describe('Service: usersservice', function () {

  // load the service's module
  beforeEach(module('sanesacttFrontendApp'));

  // instantiate service
  var usersservice;
  beforeEach(inject(function (_usersservice_) {
    usersservice = _usersservice_;
  }));

  it('should do something', function () {
    expect(!!usersservice).toBe(true);
  });

});
