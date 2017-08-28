'use strict';

describe('Service: tipoVehiculosService', function () {

  // load the service's module
  beforeEach(module('sanesacttFrontendApp'));

  // instantiate service
  var tipoVehiculosService;
  beforeEach(inject(function (_tipoVehiculosService_) {
    tipoVehiculosService = _tipoVehiculosService_;
  }));

  it('should do something', function () {
    expect(!!tipoVehiculosService).toBe(true);
  });

});
