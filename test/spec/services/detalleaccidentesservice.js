'use strict';

describe('Service: detalleAccidentesService', function () {

  // load the service's module
  beforeEach(module('sanesacttFrontendApp'));

  // instantiate service
  var detalleAccidentesService;
  beforeEach(inject(function (_detalleAccidentesService_) {
    detalleAccidentesService = _detalleAccidentesService_;
  }));

  it('should do something', function () {
    expect(!!detalleAccidentesService).toBe(true);
  });

});
