const handleResponse = (e) => {
  const obj = JSON.parse(e.target.response); // turn it back into an object

  const { item1 } = obj;
  const { item2 } = obj;

  document.querySelector('#totContainer').innerHTML = `
  <form id="winForm" action="/post-tot?item1=${item1}" method="post">
  <label for="item1">${item1}</label><br>
  <input type="radio" id="item1" name="winner" value="${item1}"><br>
  <label for="item2">${item2}</label><br>
  <input type="radio" id="item2" name="winner" value="${item2}">
  <input type="submit" value="Submit!" />
  </form>`;
};

const handleFiveResponses = (e) => {
  const obj = JSON.parse(e.target.response); // turn it back into an object

  document.querySelector('#totsContainer').innerHTML = '';

  for (let i = 0; i < 5; i += 1) {

    document.querySelector('#totsContainer').innerHTML += `
    <form id="winForm" action="/post-tot" method="post">
    <label for="item1">${obj[i].item1}</label><br>
    <input type="radio" id="item1${i}" name="winner" value="${obj[i].item1}"><br>
    <label for="item2">${obj[i].item2}</label><br>
    <input type="radio" id="item2${i}" name="winner" value="${obj[i].item2}">
    <input type="submit" value="Submit!" />
    </form>
        `;
  }
};

const downloadTot = (e) => {
  console.log(`An element of id=${e.target.id} was clicked!`);

  const totURL = '/random-tot';
  const xhr = new XMLHttpRequest();

  xhr.onload = handleResponse;

  xhr.open('GET', totURL);

  xhr.setRequestHeader('Accept', 'application/javascript');
  xhr.send();
};

const downloadFive = (e) => {
  console.log(`An element of id=${e.target.id} was clicked!`);

  const totsURL = '/random-tots?limit=5';
  const xhr = new XMLHttpRequest();
  xhr.onload = handleFiveResponses;

  xhr.open('GET', totsURL);
  xhr.setRequestHeader('Accept', 'application/javascript');
  xhr.send();
};

const init = () => {
  document.querySelector('#btnTot').addEventListener('click', downloadTot);
  document.querySelector('#btnFive').addEventListener('click', downloadFive);
};

window.onload = init;
