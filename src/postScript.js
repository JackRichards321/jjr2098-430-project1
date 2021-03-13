const parseJSON = (xhr) => {
  const content = document.querySelector('#content');
  if (xhr.response && xhr.getResponseHeader('Content-Type') === 'application/json') {
    const obj = JSON.parse(xhr.response);

    if (obj.message) {
      content.innerHTML += `<p>${obj.message}</p>`;
    }
  }
};

const handleResponse = (xhr) => {
  const content = document.querySelector('#content');

  switch (xhr.status) {
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

const downloadStatus = (e, totForm) => {
  e.preventDefault();

  const totAction = totForm.getAttribute('action');
  const totMethod = totForm.getAttribute('method');

  const item1Field = totForm.querySelector('#item1');
  const item2Field = totForm.querySelector('#item2');

  const xhr = new XMLHttpRequest();
  xhr.open(totMethod, totAction);

  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = () => handleResponse(xhr);

  const formData = `item1=${item1Field.value}&item2=${item2Field.value}`;

  xhr.send(formData);

  return false; // prevent bubbling
};

const init = () => {
  const totForm = document.querySelector('#totForm');

  const addMessage = (e) => downloadStatus(e, totForm);

  totForm.addEventListener('submit', addMessage);
};

window.onload = init;
