// bewaar het antwoord in localstorage
// met fetch options objecten maken die gebruiker kan invoeren
//https://publicapis.io/nominatim-api

const button = document.querySelector('#button1');
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

function setData(name, value) {
  const results = {
    li: name,
    val: value
  }
  document.getElementById(results.li).innerText = results.li + ' ' + results.val;
  console.log(results.li, results.val);
}

// "https://api.open-meteo.com/v1/forecast?latitude=52.305554&longitude=4.6926644&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin"
async function weatherData(params) {
  const response =
    await fetch(`https://api.open-meteo.com/v1/forecast?${params}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin`);
  const json1 = await response.json();
  // console.log(Object.entries(json1)[8]);
  const daily = Object.entries(json1)[8];
  const object = Object.entries(daily[1]);
  object.forEach(element => {
    setData(element[0], element[1][1]);
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
}

async function fetchData(params) {
  const response =
    await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
  let json2 = await response.json();
  json2 = json2[0];
  console.log(json2.lat, json2.lon);
  const params1 = new URLSearchParams({
    latitude: json2.lat,
    longitude: json2.lon
  });
  weatherData((params1.toString()));
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
}

inputButton.addEventListener('click', () => {
  const inputCity = document.querySelector('#City').value;
  const inputCountry = document.querySelector('#Country').value;
  if (inputCity !== '' && inputCountry !== '') {
    const params = new URLSearchParams({
      city: inputCity,
      country: inputCountry,
      format: 'jsonv2',
    });
    console.log(params.toString());
    fetchData(params.toString());
  }
});