const handleAllResponses = (e) => {
  const obj = JSON.parse(e.target.response); // turn it back into an object

  document.querySelector('#totDiv').innerHTML = '';

  for (let i = 0; i < 100; i += 1) {
    if (obj[i] && obj[i]) {
      const { item1 } = obj[i];
      const { item2 } = obj[i];
      const { wins1 } = obj[i];
      const { wins2 } = obj[i];

      document.querySelector('#totDiv').innerHTML += `
            <div id='adminContainer'>
            <p><b>${item1}</b> or <b>${item2}</b></p>
            <p><b>Wins: </b>${wins1} <b>Wins: </b>${wins2}</p>
            </div>`;
    } else break;
  }
};

const downloadAll = () => {
  const totsURL = '/random-tots?limit=100';
  const xhr = new XMLHttpRequest();
  xhr.onload = handleAllResponses;
  xhr.open('GET', totsURL);

  xhr.setRequestHeader('Accept', 'application/javascript');
  xhr.send();
};

const init = () => {
  downloadAll();
};

window.onload = init;
