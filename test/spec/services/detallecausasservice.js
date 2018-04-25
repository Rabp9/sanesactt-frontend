'use strict';

describe('Service: detalleCausasService', function () {

  // load the service's module
  beforeEach(module('sanesacttFrontendApp'));

  // instantiate service
  var detalleCausasService;
  beforeEach(inject(function (_detalleCausasService_) {
    detalleCausasService = _detalleCausasService_;
  }));

  it('should do something', function () {
    expect(!!detalleCausasService).toBe(true);
  });

});
