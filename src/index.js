const url = require('url');
const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/random-tot': responseHandler.getTotResponse,
    '/random-tots': responseHandler.getTotsResponse,
    '/default-styles': htmlHandler.getCSSResponse,
    '/tot-client': htmlHandler.getTotClientResponse,
    notFound: htmlHandler.get404Response,
  },
  HEAD: {
    '/random-tot': responseHandler.getTotMeta,
    '/random-tots': responseHandler.getTotsMeta,
    notFound: htmlHandler.get404ResponseMeta,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;

  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  if (urlStruct[request.method][pathname]) {
    urlStruct[request.method][pathname](request, response, acceptedTypes);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
