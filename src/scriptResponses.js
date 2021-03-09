const fs = require('fs'); // pull in the file system module

const adminScript = fs.readFileSync(`${__dirname}/../src/adminScript.js`);
const postScript = fs.readFileSync(`${__dirname}/../src/postScript.js`);
const clientScript = fs.readFileSync(`${__dirname}/../src/clientScript.js`);

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getAdminScript = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/javascript', 'Content-Length': getBinarySize(adminScript) }); // send response headers
    response.write(adminScript); // send content
    response.end(); // close connection
};

const getPostScript = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/javascript', 'Content-Length': getBinarySize(postScript) }); // send response headers
    response.write(postScript); // send content
    response.end(); // close connection
};

const getClientScript = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/javascript', 'Content-Length': getBinarySize(clientScript) }); // send response headers
    response.write(clientScript); // send content
    response.end(); // close connection
};

module.exports.getAdminScript = getAdminScript;
module.exports.getPostScript = getPostScript;
module.exports.getClientScript = getClientScript;