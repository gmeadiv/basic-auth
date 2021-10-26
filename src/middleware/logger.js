'use strict';

module.exports = function(request, response, next) {
  console.log('PATH:', request.url, 'METHOD:', request.method);

  next();
};