// bewaar het antwoord in localstorage
// met fetch options objecten maken die gebruiker kan invoeren
//https://publicapis.io/nominatim-api

const button = document.querySelector('#button1');
const nav1 = document.querySelector('header nav');
const remove = document.querySelector('#removeSidebar');
const city = document.querySelector('#City');
const inputButton = document.querySelector('#inputButton');

const weatherCode = {
  0:  'Clear sky',
  1:  'Mainly clear',
  2:  'Partly cloudy',
  3:  'Overcast',
  45: 'Fog',
  46: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail'
};

button.addEventListener('click', () => {
  nav1.classList.toggle('visible');
});

remove.addEventListener('click', () => {
  nav1.classList.remove('visible');
});

// sets data from API in dom 
// loops through weather code object and sets the code
function setData(name, value) {
  document.getElementById(name).innerText = name + ' ' + value;
  if (name == 'weather_code') {
    for (let key in weatherCode) {
      if (key == value) {
        name = weatherCode[key];
        // console.log(results.val);
        document.getElementById('weather_code').innerText = name + ' ' + value;
      }
    }
  }
}
// calls weather API, takes data and calls setData to set data in DOM
// "https://api.open-meteo.com/v1/forecast?latitude=52.305554&longitude=4.6926644&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin"
async function weatherData(params) {
  const response =
    await fetch(`https://api.open-meteo.com/v1/forecast?${params}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin`);
  const json1 = await response.json();
  // console.log(Object.entries(json1)[8]);
  const daily = Object.entries(json1)[8];
  const object = Object.entries(daily[1]);
  console.log(object);
  // loops through weather data, gets data type and wanted date of data
  // [1][0] = today, [1][1] = tomorrow, [1][2] = day after tomorrow etc, etc 
  object.forEach(element => {
    const type = element[0];
    const value = element[1][1];
    console.log(type, value);
    setData(type, value);
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
}
// gets the coordinates of the city with nominatim API, calls weatherData() with coordinates
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
// listens for submit button click, checks for input and calls fetchData()
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