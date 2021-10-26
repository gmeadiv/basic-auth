'use strict';

module.exports = function (request, response, next) {
  const method = request.method;
  const path = request.url;

  if (method !== 'GET' || method !== 'POST' || method !== 'PUT' || method !== 'DELETE') {
    console.log('404 ERROR BAD REQUEST');
    response.status(404);
    response.end();

  } else if (path !== '/signup' || path !== '/signin') {
    console.log('404 ERROR BAD PATH');
    response.status(404);
    response.end();
    
  } else {
    response.status(200);
  }
};