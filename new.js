// bewaar het antwoord in localstorage
// met fetch options objecten maken die gebruiker kan invoeren
//https://publicapis.io/nominatim-api
// https://www.weer.nl/
// https://www.weerplaza.nl/weerwidgets/
// this.childNodes().forEach(node => ... node.remove()) 
import { dailyWeather } from './dailyWeather.js';

const button = document.querySelector('#button1');
const nav1 = document.querySelector('header nav');
const remove = document.querySelector('#removeSidebar');
const city = document.querySelector('#City');
const inputButton = document.querySelector('#inputButton');
const rightSide = document.querySelector('#rightSide');
const dataTarget = document.querySelector('#data');


const weatherCode = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
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

function clearDom() {
  if (dataTarget.firstChild && dataTarget !== null) {
    const targets = document.querySelector('.target');
    const dataClass = document.querySelector('.dailyWeather');
    data.removeChild(targets, dataClass);
  }
}

function setData(object) {
  console.log('Setting data...');
  object.forEach((array) => {
    const type = array[0];
    let data = array[1][0];
    // console.log(type, data);
    if (type == 'weather_code') {
      for (let key in weatherCode) {
        if (key == data) {
          data = weatherCode[key];
        }
      }
    }
    // Creating an instance of MyClass

    const dataDiv = document.createElement('div');
    const dataTarget = document.createElement('div');
    dataTarget.id = 'data';
    rightSide.append(dataTarget);
    const pType = document.createElement('p').innerText = 'Type: ' + type + ' ';
    const pData = document.createElement('p').innerText = 'Data: ' + data;
    const br = document.createElement('br');
    dataDiv.append(pType, br, pData, br);
    dataDiv.className = 'target';
    dataTarget.append(dataDiv);
  });
  const dataTargetId = document.querySelector('#data');
  const targetWrapper = document.createElement('div');
  targetWrapper.id = 'targetWrapper'
  targetWrapper.append(dataTargetId);
  const myObject = new dailyWeather();
  dataTargetId.append(myObject);
  rightSide.append(targetWrapper);
}


// calls weather API, takes data and calls setData to set data in DOM
// "https://api.open-meteo.com/v1/forecast?latitude=52.305554&longitude=4.6926644&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin"
async function weatherData(params) {
  const response =
    await fetch(`https://api.open-meteo.com/v1/forecast?${params}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Europe%2FBerlin`);
  const json1 = await response.json();
  // console.log(json1);
  const daily = Object.entries(json1)[8];
  console.log(daily[1]);
  const object = Object.entries(daily[1]);
  console.log(object);
  setData(object);
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
  clearDom();
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