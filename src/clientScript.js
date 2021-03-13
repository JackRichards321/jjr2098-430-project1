const parseJSON = (xhr) => {
  const content = document.querySelector('#content');
  if (xhr.response && xhr.getResponseHeader('Content-Type') === 'application/json') {
    const obj = JSON.parse(xhr.response);

    if (obj.message) {
      content.innerHTML += `<p>${obj.message}</p>`;
    }
  }
};

const handleMessageResponse = (xhr) => {
  const content = document.querySelector('#content');

  switch (xhr.status) {
    case 200:
      content.innerHTML = '<b>Success!</b>';
      break;
    case 204:
      content.innerHTML = '<b>Updated Winner!</b>';
      break;
    case 400:
      content.innerHTML = '<b>Bad Request!</b>';
      break;
    default:
      content.innerHTML = '<b>Error code not implemented by client</b>';
  }

  parseJSON(xhr);
};

const downloadStatus = (e, totForm) => {
  e.preventDefault();

  const totAction = totForm.getAttribute('action');
  const totMethod = totForm.getAttribute('method');

  const totIDField = totForm.querySelector('#totID');

  // code snippet from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
  // modified for this project by JR
  const data = new FormData(totForm);
  const winner = data.get('winner');

  const xhr = new XMLHttpRequest();
  xhr.open(totMethod, totAction);

  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = () => handleMessageResponse(xhr);

  const formData = `totID=${totIDField.value}&winner=${winner}`;

  xhr.send(formData);

  return false; // prevent bubbling
};

const handleResponse = (e) => {
  const obj = JSON.parse(e.target.response); // turn it back into an object

  const { item1 } = obj;
  const { item2 } = obj;

  document.querySelector('#totContainer').innerHTML = `
  <form id="winForm" action="/add-tot" method="post">
  <label for="item1">${item1}</label>
  <input type="radio" id="item1" name="winner" value="${item1}"><br>
  <label for="item2">${item2}</label>
  <input type="radio" id="item2" name="winner" value="${item2}">
  <input type="hidden" id="totID" name="totID" value="${item1 + item2}" />
  <br>
  <input type="submit" value="Submit!" />
  </form>`;

  const winForm = document.querySelector('#winForm');

  const addMessage = (ee) => {
    downloadStatus(ee, winForm);
  };

  winForm.addEventListener('submit', addMessage);
};

const downloadTot = () => {
  const totURL = '/random-tot';
  const xhr = new XMLHttpRequest();

  xhr.onload = handleResponse;

  xhr.open('GET', totURL);

  xhr.setRequestHeader('Accept', 'application/javascript');
  xhr.send();
};

const init = () => {
  document.querySelector('#btnTot').addEventListener('click', downloadTot);
};

window.onload = init;
