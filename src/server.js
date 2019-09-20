const http = require('http');

const url = require('url');

const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');

const jsonHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.getSuccess,
  '/badRequest': jsonHandler.getBadRequest,
  '/unauthorized': jsonHandler.getUnauth,
  '/forbidden': jsonHandler.getForbidden,
  '/internal': jsonHandler.getInternal,
  '/notImplemented': jsonHandler.getNotImp,
  notFound: jsonHandler.getNotFound,
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);

  // Paremets to check, if necessary
  const params = query.parse(parsedURL.query);

  // Type of data requested from Accept headers
  const acceptTypes = request.headers.accept.split(',');


  if (urlStruct[parsedURL.pathname]) {
    // Checking if additional parameters need to be checked for certain web pages
    if (parsedURL.pathname === '/badRequest' || parsedURL.pathname === '/unauthorized') {
      urlStruct[parsedURL.pathname](request, response, acceptTypes, params);
    } else {
      urlStruct[parsedURL.pathname](request, response, acceptTypes);
    }
  } else {
    urlStruct.notFound(request, response, acceptTypes);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
