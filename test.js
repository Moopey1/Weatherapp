// bewaar het antwoord in localstorage
// met fetch options objecten maken die gebruiker kan invoeren
//https://publicapis.io/nominatim-api

const button = document.querySelector("#button1");
const nav1 = document.querySelector('header nav');
const remove = document.querySelector('#removeSidebar');
const city = document.querySelector('#City');
const inputButton = document.querySelector('#inputButton');
button.addEventListener('click', () => {
  nav1.classList.toggle('visible');
});
remove.addEventListener('click', () => {
  nav1.classList.remove('visible');
});
inputButton.addEventListener('click', () => {
  fetchData();
});
const params = new URLSearchParams({
  q: 'amsterdam',
  format: "json",
  limit: 10,
});

const test0 = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.3025&longitude=4.6889&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((response) => {
    return response;
  });

async function fetchData() {
await fetch(`https://nominatim.openstreetmap.org/search.php?${params}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((response) => {
    console.log(response);
    return response;
  });
}

console.log(test0);
fetchData();



