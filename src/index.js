const url = require('url');
const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  'GET': {
    '/random-joke': responseHandler.getRandomJokeResponse,
    '/random-jokes': responseHandler.getJokesResponse,
    '/default-styles': htmlHandler.getCSSResponse,
    notFound: htmlHandler.get404Response,
  },
  'HEAD': {
    '/random-joke': responseHandler.getJokeMeta,
    '/random-jokes': responseHandler.getJokesMeta,
    notFound: htmlHandler.get404ResponseMeta
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
