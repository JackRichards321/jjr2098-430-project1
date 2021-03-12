const url = require('url');
const query = require('querystring');
const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');
const scriptHandler = require('./scriptResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getTotClientResponse,
    '/post-tot': htmlHandler.getPostPage,
    '/admin': htmlHandler.getAdminPage,
    '/random-tot': responseHandler.getTotResponse,
    '/random-tots': responseHandler.getTotsResponse,
    '/default-styles.css': htmlHandler.getCSSResponse,
    '/adminScript.js': scriptHandler.getAdminScript,
    '/postScript.js': scriptHandler.getPostScript,
    '/clientScript.js': scriptHandler.getClientScript,
    notFound: htmlHandler.get404Response,
  },
  HEAD: {
    '/random-tot': responseHandler.getTotMeta,
    '/random-tots': responseHandler.getTotsMeta,
    '/admin': htmlHandler.getAdminMeta,
    '/post-tot': htmlHandler.getPostMeta,
    notFound: htmlHandler.get404ResponseMeta,
  },
};

// handlePost and snippet in onRequest taken from POST-demo-start
const handlePosts = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/add-tot') {
    console.log(`handlePosts called with pathname: ${parsedUrl.pathname}`);
    const body = [];

    // https://nodejs.org/api/http.html
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString(); // name=tony&age=35
      const bodyParams = query.parse(bodyString); // turn into an object with .name & .age
      responseHandler.addTot(request, response, bodyParams);
    });
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;

  if (request.method === 'POST') {
    // handle POST
    handlePosts(request, response, parsedUrl);
    return; // bail out of function
  }

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
