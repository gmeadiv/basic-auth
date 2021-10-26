'use strict';

const logger = require('../src/middleware/logger.js');

describe('Testing the logging middleware', () => {

  let request = {method: 'POST', url: '/signup'};
  let response = {};
  let next = jest.fn();
  console.log = jest.fn();

  it('should be able to log a method and a path', () => {
    logger(request, response, next);

    expect(console.log).toHaveBeenCalledWith('PATH:', '/signup', 'METHOD:', 'POST');
    expect(next).toHaveBeenCalled();
  });

  it('Should throw an error when a different method is called', () => {
    request.method = 'PATCH';

    logger(request, response, next);
    expect(console.log).toHaveBeenCalledWith('PATH:', '/signup', 'METHOD:', 'PATCH');
    expect(next).toHaveBeenCalledWith();
  });

  it('Should throw an error when the wrong path is pursued', () => {
    request.method = 'POST';
    request.url = '/wrong';

    logger(request, response, next);
    expect(next).toHaveBeenCalledWith();
  });
});