const underscoreHandler = require('underscore');
const query = require('querystring');
const url = require('url');

const items = [
  { name: 'Apple', wins: 0, category: 'fruit' },
  { name: 'Banana', wins: 0, category: 'fruit' },
  { name: 'Orange', wins: 0, category: 'fruit' },
  { name: 'Lemon', wins: 0, category: 'fruit' },
  { name: 'Lime', wins: 0, category: 'fruit' },
  { name: 'Papaya', wins: 0, category: 'fruit' },
  { name: 'Grape', wins: 0, category: 'fruit' },
  { name: 'Cherry', wins: 0, category: 'fruit' },
  { name: 'Blueberry', wins: 0, category: 'fruit' },
  { name: 'Watermelon', wins: 0, category: 'fruit' },
  { name: 'Peach', wins: 0, category: 'fruit' },
  { name: 'Pear', wins: 0, category: 'fruit' },
  { name: 'Plum', wins: 0, category: 'fruit' },
  { name: 'Apricot', wins: 0, category: 'fruit' },
  { name: 'Pineapple', wins: 0, category: 'fruit' },
  { name: 'Honeydew', wins: 0, category: 'fruit' },
  { name: 'Cantaloupe', wins: 0, category: 'fruit' },
  { name: 'Strawberry', wins: 0, category: 'fruit' }
];

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getTotJSON = (limit = 1) => {
  const lim1 = Number(limit);
  const lim2 = !lim1 ? 1 : lim1;
  const lim3 = lim2 < 1 ? 1 : lim2;

  if (lim3 === 1) {
    let number1 = Math.floor(Math.random() * (items.length));
    let number2 = Math.floor(Math.random() * (items.length));
    while (number1 === number2) number2 = Math.floor(Math.random() * (items.length));

    const responseObj = {
      item1: items[number1].name,
      item2: items[number2].name,
    };

    return JSON.stringify(responseObj);
  }

  const shuffledItems = underscoreHandler.shuffle(items);

  const responseObj = [];

  for (let i = 0; i < limit; i += 1) {
    responseObj.push(`item ${i + 1}: ` + shuffledItems[i].name);
  }

  return JSON.stringify(responseObj);
};

const getTotXML = (limit = 1) => {
  const responseObj = [];

  const shuffledItems = underscoreHandler.shuffle(items);

  for (let i = 0; i < limit; i += 1) {
    responseObj.push(
      `<name>${shuffledItems[i].name}</name>`
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
