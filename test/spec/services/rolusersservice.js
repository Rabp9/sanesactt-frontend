'use strict';

describe('Service: RolUsersService', function () {

  // load the service's module
  beforeEach(module('sanesacttFrontendApp'));

  // instantiate service
  var RolUsersService;
  beforeEach(inject(function (_RolUsersService_) {
    RolUsersService = _RolUsersService_;
  }));

  it('should do something', function () {
    expect(!!RolUsersService).toBe(true);
  });

});
