const underscoreHandler = require('underscore');
const query = require('querystring');
const url = require('url');
// const wins = require('./wins.js');
const items = require('./items.js');

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getTotJSON = (limit = 1) => {
  const lim1 = Number(limit);
  const lim2 = !lim1 ? 1 : lim1;
  const lim3 = lim2 < 1 ? 1 : lim2;

  if (lim3 === 1) {
    const number = Math.floor(Math.random() * (items.length));

    const responseObj = {
      item1: items[number].item1.name,
      item2: items[number].item2.name,
      wins1: items[number].item1.wins,
      wins2: items[number].item2.wins,
    };
    debugger;
    return JSON.stringify(responseObj);
  }

  const shuffledItems = underscoreHandler.shuffle(items);

  const responseObj = [];
  let totObj = {};

  for (let i = 0; i < limit; i += 1) {
    if (shuffledItems[i]) {
      totObj = {
        item1: shuffledItems[i].item1.name,
        item2: shuffledItems[i].item2.name,
        wins1: shuffledItems[i].item1.wins,
        wins2: shuffledItems[i].item2.wins,
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
      `<item1>${shuffledItems[i].item1.name}</item1><p> OR </p><item2>${shuffledItems[i].item2.name}</item2>`,
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

// const addTot = (request, response, acceptedTypes) => {

// };

module.exports.getTotResponse = getTotResponse;
module.exports.getTotsResponse = getTotsResponse;
module.exports.getTotMeta = getTotMeta;
module.exports.getTotsMeta = getTotsMeta;
// module.exports.addTot = addTot;
