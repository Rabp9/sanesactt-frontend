'use strict';

describe('Filter: searchTextFilter', function () {

  // load the filter's module
  beforeEach(module('sanesacttFrontendApp'));

  // initialize a new instance of the filter before each test
  var searchTextFilter;
  beforeEach(inject(function ($filter) {
    searchTextFilter = $filter('searchTextFilter');
  }));

  it('should return the input prefixed with "searchTextFilter filter:"', function () {
    var text = 'angularjs';
    expect(searchTextFilter(text)).toBe('searchTextFilter filter: ' + text);
  });

});
