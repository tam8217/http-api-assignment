// Catch-all function which can be used for multiple kinda of content types
const sendResponse = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getSuccess = (request, response, types) => {
  // JSON object which will store data and be sent out
  const tempObj = {
    message: 'This was a successful call',
  };

  // Creating a separate response to send out if XML is requested
  if (types[0] === 'text/xml') {
    const responseXML = `<response><message>${tempObj.message}</message></response>`;
    return sendResponse(request, response, 200, responseXML, types[0]);
  }

  // Sending back JSON as a default, or if XML is not requested
  return sendResponse(request, response, 200, JSON.stringify(tempObj), types[0]);
};

const getBadRequest = (request, response, types, params) => {
  const tempObj = {
    message: 'This is a successful response',
  };

  // Checking if there is a parameter at all, or if there is a parameter,if it is correct or not
  if (!params.valid || params.valid !== 'true') {
    tempObj.message = 'Missing valid query parameter set to true';
    tempObj.id = 'badRequest';

    if (types[0] === 'text/xml') {
      const responseXML = `<response><message>${tempObj.message}</message><id>${tempObj.id}</id></response>`;

      return sendResponse(request, response, 400, responseXML, types[0]);
    }

    return sendResponse(request, response, 400, JSON.stringify(tempObj), types[0]);
  }

  // If the parameters are correct, send out a successful response
  if (types[0] === 'text/xml') {
    const responseXML = `<response><message>${tempObj.message}</message></response>`;

    return sendResponse(request, response, 200, responseXML, types[0]);
  }

  return sendResponse(request, response, 200, JSON.stringify(tempObj), types[0]);
};

const getUnauth = (request, response, types, params) => {
  const tempObj = {
    message: 'You have successfully viewed the content',
  };


  if (!params.loggedIn || params.loggedIn !== 'yes') {
    tempObj.message = 'Missing loggedIn query parameter set to yes';
    tempObj.id = 'unauthorized';

    if (types[0] === 'text/xml') {
      const responseXML = `<response><message>${tempObj.message}</message><id>${tempObj.id}</id></response>`;

      return sendResponse(request, response, 401, responseXML, types[0]);
    }

    return sendResponse(request, response, 401, JSON.stringify(tempObj), types[0]);
  }

  if (types[0] === 'text/xml') {
    const responseXML = `<response><message>${tempObj.message}</message></response>`;

    return sendResponse(request, response, 200, responseXML, types[0]);
  }

  return sendResponse(request, response, 200, JSON.stringify(tempObj), types[0]);
};

const getForbidden = (request, response, types) => {
  const tempObj = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (types[0] === 'text/xml') {
    const responseXML = `<response><message>${tempObj.message}</message><id>${tempObj.id}</id></response>`;
    return sendResponse(request, response, 403, responseXML, types[0]);
  }

  return sendResponse(request, response, 403, JSON.stringify(tempObj), types[0]);
};
const getInternal = (request, response, types) => {
  const tempObj = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  if (types[0] === 'text/xml') {
    const responseXML = `<response><message>${tempObj.message}</message><id>${tempObj.id}</id></response>`;
    return sendResponse(request, response, 500, responseXML, types[0]);
  }

  return sendResponse(request, response, 500, JSON.stringify(tempObj), types[0]);
};

const getNotImp = (request, response, types) => {
  const tempObj = {
    message: 'A get request for this page has not been implented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (types[0] === 'text/xml') {
    const responseXML = `<response><message>${tempObj.message}</message><id>${tempObj.id}</id></response>`;
    return sendResponse(request, response, 501, responseXML, types[0]);
  }

  return sendResponse(request, response, 501, JSON.stringify(tempObj), types[0]);
};

const getNotFound = (request, response, types) => {
  const tempObj = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (types[0] === 'text/xml') {
    const responseXML = `<response><message>${tempObj.message}</message><id>${tempObj.id}</id></response>`;
    return sendResponse(request, response, 404, responseXML, types[0]);
  }

  return sendResponse(request, response, 404, JSON.stringify(tempObj), types[0]);
};

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauth,
  getForbidden,
  getInternal,
  getNotImp,
  getNotFound,
};
