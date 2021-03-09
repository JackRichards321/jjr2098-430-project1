// code starter supplied by body-parse demo
const sendPost = (e, totForm) => {
    e.preventDefault();

    const totAction = totForm.getAttribute("action");
    const totMethod = totForm.getAttribute("method");

    const item1Field = totForm.querySelector("#item1Field");
    const item2Field = totForm.querySelector("#item2Field");

    const xhr = new XMLHttpRequest();
    xhr.open(totMethod, totAction); // NEW - in the past we've been using "GET"

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = handlePostResponse;

    const formData = `item1=${item1Field.value}&item2=${item2Field.value}`;
    xhr.send(formData);

    return false; // prevents event bubbling
};

// code snippet from POST-demo-start
const handlePostResponse = (request, response, parsedUrl) => {
    if (parsedUrl.pathname === '/add-tot') {
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

const init = () => {
    const totForm = document.querySelector('#totForm');

    const postTot = (e) => sendPost(e, totForm);

    totForm.addEventListener('submit', postTot);
};