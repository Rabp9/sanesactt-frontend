'use strict';

describe('Service: oauthhttpinterceptor', function () {

  // load the service's module
  beforeEach(module('sanesacttFrontendApp'));

  // instantiate service
  var oauthhttpinterceptor;
  beforeEach(inject(function (_oauthhttpinterceptor_) {
    oauthhttpinterceptor = _oauthhttpinterceptor_;
  }));

  it('should do something', function () {
    expect(!!oauthhttpinterceptor).toBe(true);
  });

});
