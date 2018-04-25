'use strict';

describe('Service: DetalleUbicacionesService', function () {

  // load the service's module
  beforeEach(module('sanesacttFrontendApp'));

  // instantiate service
  var DetalleUbicacionesService;
  beforeEach(inject(function (_DetalleUbicacionesService_) {
    DetalleUbicacionesService = _DetalleUbicacionesService_;
  }));

  it('should do something', function () {
    expect(!!DetalleUbicacionesService).toBe(true);
  });

});
