const parseJSON = (xhr) => {
  const content = document.querySelector('#content');
  if (xhr.response && xhr.getResponseHeader('Content-Type') === 'application/json') {
    const obj = JSON.parse(xhr.response);
    console.dir(obj);

    if (obj.message) {
      content.innerHTML += `<p>${obj.message}</p>`;
    }
  }
};

const handleResponse = (xhr) => {
  const content = document.querySelector('#content');
  console.log(xhr.target);
  console.log(`HANDLERESPONSE POST XHR STATUS: ${xhr.target.status}`);

  switch (xhr.target.status) {
    case 200:
      content.innerHTML = '<b>Success!</b>';
      break;
    case 201:
      content.innerHTML = '<b>Created!</b>';
      break;
    case 204:
      content.innerHTML = '<b>Updated (No Content)!</b>';
      break;
    case 400:
      content.innerHTML = '<b>Bad Request!</b>';
      break;
    default:
      content.innerHTML = '<b>Error code not implemented by client</b>';
  }

  parseJSON(xhr);
};

const downloadStatus = () => {
  const pageURL = '/add-tot';
  const xhr = new XMLHttpRequest();
  xhr.onload = handleResponse;
  xhr.open('GET', pageURL);

  xhr.setRequestHeader('Accept', 'application/javascript');
  xhr.send();
};

const init = () => {
  const totForm = document.querySelector('#totForm');

  const addMessage = (e) => downloadStatus(e, totForm);

  totForm.addEventListener('submit', addMessage);
};

window.onload = init;
