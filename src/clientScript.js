const handleResponse = (e) => {
  const obj = JSON.parse(e.target.response); // turn it back into an object

  const { item1 } = obj;
  const { item2 } = obj;

  document.querySelector('#totContainer').innerHTML = `
  <form id="winForm" action="/add-tot" method="post">
  <label for="item1">${item1}</label><br>
  <input type="radio" id="item1" name="winner" value="${item1}"><br>
  <label for="item2">${item2}</label><br>
  <input type="radio" id="item2" name="winner" value="${item2}">
  <input type="hidden" name="totID" value="${item1 + item2}" />
  <input type="submit" value="Submit!" />
  </form>`;
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

const init = () => {
  document.querySelector('#btnTot').addEventListener('click', downloadTot);
};

window.onload = init;
