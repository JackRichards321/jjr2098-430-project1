const items = require('./items.js');

const handleAllResponses = (e) => {
    //console.log("e.target =", e.target); // here, `e.target` is the `xhr` object
    //console.log("e.target.response =", e.target.response); // so that means this is a string of "tot" JSON
    const obj = JSON.parse(e.target.response); // turn it back into an object
    //console.log("obj =", obj);
    debugger;
    document.querySelector("#totDiv").innerHTML = ``;

    for (let i = 0; i < items.length; i += 1) {
        let item1 = obj.item1.name;
        let item2 = obj.item2.name;

        document.querySelector("#totDiv").innerHTML += `
        <div id='totContainer'>
        <p><button class="btnThis"><b>${item1}</b></button></p>
        <p>OR<p>
        <p><button class="btnThis"><b>${item2}</b></button></p>
        </div>
        `;
    }

    document.querySelector(".btnThis").addEventListener("click", winnerPicked(obj));
};

const downloadAll = (e) => {
    const totsURL = `/random-tots?limit=${items.length}`;
    const xhr = new XMLHttpRequest();
    xhr.onload = handleAllResponses;
    xhr.open("GET", totsURL);
    // with XHR, after we open a connection, but before we `send()`, we can set 1 or more HTTP request handlers
    // this isn't strictly necessary because "/random-tot" sends JSON by default
    xhr.setRequestHeader('Accept', "application/javascript");
    xhr.send();
};

const init = () => {
    document.querySelector("#btnTot").addEventListener("click", downloadAll);
};

window.onload = init;