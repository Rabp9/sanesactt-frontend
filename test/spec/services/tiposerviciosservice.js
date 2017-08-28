'use strict';

describe('Service: tipoServiciosService', function () {

  // load the service's module
  beforeEach(module('sanesacttFrontendApp'));

  // instantiate service
  var tipoServiciosService;
  beforeEach(inject(function (_tipoServiciosService_) {
    tipoServiciosService = _tipoServiciosService_;
  }));

  it('should do something', function () {
    expect(!!tipoServiciosService).toBe(true);
  });

});
