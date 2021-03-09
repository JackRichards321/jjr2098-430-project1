const handleResponse = (e) => {
  const obj = JSON.parse(e.target.response); // turn it back into an object

  const { item1 } = obj;
  const { item2 } = obj;

  document.querySelector('#totContainer').innerHTML = `
        <p><button class="btnThis" onclick="winnerPicked(event)"><b>${item1}</b></button></p>
        <p>OR<p>
        <p><button class="btnThat" onclick="winnerPicked(event)"><b>${item2}</b></button></p>
    `;
};

const handleFiveResponses = (e) => {
  const obj = JSON.parse(e.target.response); // turn it back into an object

  document.querySelector('#totsContainer').innerHTML = '';

  for (let i = 0; i < 5; i += 1) {
    const { item1 } = obj[i];
    const { item2 } = obj[i];

    document.querySelector('#totsContainer').innerHTML += `
        <div id='totContainer'>
        <p><button class="btnThis" value="${item1}" onclick="winnerPicked(event)"><b>${item1}</b></button></p>
        <p>OR<p>
        <p><button class="btnThat" value="${item2}" onclick="winnerPicked(event)"><b>${item2}</b></button></p>
        </div>
        `;
  }
};

const downloadTot = (e) => {
  // remember that an `Event` object gets passed along every time that an event handler or listener calls a function
  // the `target` property of that event points at the element that sent the event, in this case a button
  console.log(`An element of id=${e.target.id} was clicked!`);

  const totURL = '/random-tot';
  const xhr = new XMLHttpRequest();

  xhr.onload = handleResponse;

  xhr.open('GET', totURL);
  // with XHR, after we open a connection, but before we `send()`, we can set 1 or more HTTP request handlers
  // this isn't strictly necessary because "/random-tot" sends JSON by default
  xhr.setRequestHeader('Accept', 'application/javascript');
  xhr.send();
};

const downloadFive = (e) => {
  // remember that an `Event` object gets passed along every time that an event handler or listener calls a function
  // the `target` property of that event points at the element that sent the event, in this case a button
  console.log(`An element of id=${e.target.id} was clicked!`);

  const totsURL = '/random-tots?limit=5';
  const xhr = new XMLHttpRequest();
  xhr.onload = handleFiveResponses;
  xhr.open('GET', totsURL);
  // with XHR, after we open a connection, but before we `send()`, we can set 1 or more HTTP request handlers
  // this isn't strictly necessary because "/random-tot" sends JSON by default
  xhr.setRequestHeader('Accept', 'application/javascript');
  xhr.send();
};

const winnerPicked = (e) => {
  console.log(`this button clicked: ${e.target.innerHTML}`);

  const winner = e.target.innerHTML;
};

const init = () => {
  // An Event *Handler*
  // document.querySelector("#btnTot").onclick = downloadTot; // same as below, less typing, use which ever version you prefer

  // An Event *Listener*
  document.querySelector('#btnTot').addEventListener('click', downloadTot);
  document.querySelector('#btnFive').addEventListener('click', downloadFive);

  // **Actually, event handlers and listeners are NOT exactly the same in all use cases - what ARE the differences?**
};

window.onload = init;
