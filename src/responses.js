const underscoreHandler = require('underscore');
const query = require('querystring');
const url = require('url');
const fs = require('fs'); // pull in the file system module
const items = require('./items.js');

const htmlHandler = require('./htmlResponses.js');

const postPage = fs.readFileSync(`${__dirname}/../client/post-page.html`);

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getTotJSON = (limit = 1) => {
  const lim1 = Number(limit);
  const lim2 = !lim1 ? 1 : lim1;
  const lim3 = lim2 < 1 ? 1 : lim2;

  if (lim3 === 1) {
    const shuffledItems = underscoreHandler.shuffle(items);
  
    const responseObj = {
      item1: shuffledItems[0].item1,
      item2: shuffledItems[0].item2,
      wins1: shuffledItems[0].wins1,
      wins2: shuffledItems[0].wins2,
    };

    return JSON.stringify(responseObj);
  }

  const shuffledItems = underscoreHandler.shuffle(items);

  const responseObj = [];
  let totObj = {};

  for (let i = 0; i < lim3; i += 1) {
    if (shuffledItems[i]) {
      totObj = {
        item1: shuffledItems[i].item1,
        item2: shuffledItems[i].item2,
        wins1: shuffledItems[i].wins1,
        wins2: shuffledItems[i].wins2,
      };

      responseObj.push(totObj);
    }
  }

  return JSON.stringify(responseObj);
};

const getTotXML = (limit = 1) => {
  const responseObj = [];

  const shuffledItems = underscoreHandler.shuffle(items);

  for (let i = 0; i < limit; i += 1) {
    responseObj.push(
      `<item1>${shuffledItems[i].item1}</item1><p> OR </p><item2>${shuffledItems[i].item2}</item2>`,
    );
  }

  return (`<tot>
            ${responseObj}    
        </tot>`);
};

const getTotResponse = (request, response, acceptedTypes) => {
  if (acceptedTypes.includes('text/xml')) {
    response.writeHead(200, { 'Content-Type': 'text/xml' }); // send response headers
    response.write(getTotXML()); // send content
    response.end(); // close connection
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' }); // send response headers
    response.write(getTotJSON()); // send content
    response.end(); // close connection
  }
};
const getTotsResponse = (request, response, acceptedTypes) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const { limit } = params;

  if (acceptedTypes.includes('text/xml')) {
    response.writeHead(200, { 'Content-Type': 'text/xml' }); // send response headers
    response.write(getTotXML(limit)); // send content
    response.end(); // close connection
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' }); // send response headers
    response.write(getTotJSON(limit)); // send content
    response.end(); // close connection
  }
};

const getTotMeta = (request, response, acceptedTypes) => {
  if (acceptedTypes.includes('text/xml')) {
    response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': getBinarySize(getTotXML()) }); // send response headers
    response.end(); // close connection
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': getBinarySize(getTotJSON()) }); // send response headers
    response.end(); // close connection
  }
};

const getTotsMeta = (request, response, acceptedTypes) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const { limit } = params;

  if (acceptedTypes.includes('text/xml')) {
    response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': getBinarySize(getTotXML(limit)) }); // send response headers
    response.end(); // close connection
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': getBinarySize(getTotJSON(limit)) }); // send response headers
    response.end(); // close connection
  }
};

// next three methods taken and adapted from POST-demo-start
const sendJSONResponse = (request, response, responseCode, object) => {
  response.writeHead(responseCode, { 'Content-Type': 'text/html' });
  response.write(postPage);
  response.end();
};

const sendJSONResponseMeta = (request, response, responseCode) => {
  response.writeHead(responseCode, { 'Content-Type': 'application/json' });
  response.end();
};

const addTot = (request, response, body) => {
  // here we are assuming an error, pessimistic aren't we?
  let responseCode = 400; // 400=bad request
  const responseJSON = {
    id: 'missingParams',
    message: 'both items are required',
  };

  // missing items?
  if (!body.item1 || !body.item2) {
    console.log(responseCode);
    return sendJSONResponse(request, response, responseCode, responseJSON);
  }

  // we DID get 2 items
  if (items[body.item1]) { // if the tot exists
    responseCode = 204;
    console.log(responseCode);
    return sendJSONResponseMeta(request, response, responseCode);
  }

  // if the tot does not exist
  items[body.item1] = {}; // make a new tot
  // initialize values
  items[body.item1].item1 = body.item1;
  items[body.item1].wins1 = 0;
  items[body.item1].item2 = body.item2;
  items[body.item1].wins2 = 0;

  responseCode = 201; // send "created" status code
  responseJSON.id = 'created';
  responseJSON.message = 'Success!';
  responseJSON.item1 = items[body.item1].item1;
  responseJSON.item2 = items[body.item1].item2;
  console.log(responseCode);
  return sendJSONResponse(request, response, responseCode, responseJSON);
};


module.exports.getTotResponse = getTotResponse;
module.exports.getTotsResponse = getTotsResponse;
module.exports.getTotMeta = getTotMeta;
module.exports.getTotsMeta = getTotsMeta;
module.exports.addTot = addTot;
