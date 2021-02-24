const fs = require('fs'); // pull in the file system module

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const styles = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = string => Buffer.byteLength(string, 'utf8');

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
    response.writeHead(200, { 'Content-Type': 'text/css', 'Content-Length': getBinarySize(styles) }); // send response headers
    response.write(styles); // send content
    response.end(); // close connection
};

module.exports.get404Response = get404Response;
module.exports.get404ResponseMeta = get404ResponseMeta;
module.exports.getCSSResponse = getCSSResponse;
