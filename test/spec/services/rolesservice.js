'use strict';

describe('Service: RolesService', function () {

  // load the service's module
  beforeEach(module('sanesacttFrontendApp'));

  // instantiate service
  var RolesService;
  beforeEach(inject(function (_RolesService_) {
    RolesService = _RolesService_;
  }));

  it('should do something', function () {
    expect(!!RolesService).toBe(true);
  });

});
