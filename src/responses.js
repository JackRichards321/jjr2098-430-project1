const underscoreHandler = require('underscore');
const query = require('querystring');
const url = require('url');
let wins = require('./wins.js');
let items = require('./items.js');

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getTotJSON = (limit = 1) => {
  const lim1 = Number(limit);
  const lim2 = !lim1 ? 1 : lim1;
  const lim3 = lim2 < 1 ? 1 : lim2;

  if (lim3 === 1) {
    const number1 = Math.floor(Math.random() * (items.length));
    // let number2 = Math.floor(Math.random() * (items.length));
    // while (number1 === number2) number2 = Math.floor(Math.random() * (items.length));

    const responseObj = {
      item1: items[number1].item1,
      item2: items[number1].item2,
      id1: items[number1].id1,
      id2: items[number1].id2,
    };

    return JSON.stringify(responseObj);
  }

  const shuffledItems = underscoreHandler.shuffle(items);

  const responseObj = [];

  for (let i = 0; i < limit; i += 1) {
    responseObj.push(`${shuffledItems[i].item1} or ${shuffledItems[i].item2}`);
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

module.exports.getTotResponse = getTotResponse;
module.exports.getTotsResponse = getTotsResponse;
module.exports.getTotMeta = getTotMeta;
module.exports.getTotsMeta = getTotsMeta;
module.exports.wins = wins;
