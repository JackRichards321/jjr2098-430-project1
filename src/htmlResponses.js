const fs = require('fs'); // pull in the file system module

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const stylePage = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const totClient = fs.readFileSync(`${__dirname}/../client/tot-client.html`);
const postPage = fs.readFileSync(`${__dirname}/../client/post-page.html`);
const adminPage = fs.readFileSync(`${__dirname}/../client/admin-page.html`);

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html', 'Content-Length': getBinarySize(errorPage) }); // send response headers
  response.write(errorPage); // send content
  response.end(); // close connection
};

const get404ResponseMeta = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html', 'Content-Length': getBinarySize(errorPage) }); // send response headers
  response.end(); // close connection
};

const getCSSResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css', 'Content-Length': getBinarySize(stylePage) }); // send response headers
  response.write(stylePage); // send content
  response.end(); // close connection
};

const getTotClientResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': getBinarySize(totClient) }); // send response headers
  response.write(totClient); // send content
  response.end(); // close connection
};

const getPostPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': getBinarySize(postPage) }); // send response headers
  response.write(postPage); // send content
  response.end(); // close connection
};

const getPostMeta = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': getBinarySize(postPage) }); // send response headers
  response.end(); // close connection
};

const getAdminPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': getBinarySize(adminPage) }); // send response headers
  response.write(adminPage); // send content
  response.end(); // close connection
};

const getAdminMeta = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': getBinarySize(adminPage) }); // send response headers
  response.end(); // close connection
};

module.exports.get404Response = get404Response;
module.exports.get404ResponseMeta = get404ResponseMeta;
module.exports.getCSSResponse = getCSSResponse;
module.exports.getTotClientResponse = getTotClientResponse;
module.exports.getPostPage = getPostPage;
module.exports.getPostMeta = getPostMeta;
module.exports.getAdminPage = getAdminPage;
module.exports.getAdminMeta = getAdminMeta;
