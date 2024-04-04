// bewaar het antwoord in localstorage
// met fetch options objecten maken die gebruiker kan invoeren
//https://publicapis.io/nominatim-api
// https://www.weer.nl/
// https://www.weerplaza.nl/weerwidgets/
// https://appshots.design/apps/nothing-weather-komponent-app-shot-nothing_weather_
// this.childNodes().forEach(node => ... node.remove()) 
import { dailyWeather } from './dailyWeather.js';

const button = document.querySelector('#button1');
const nav1 = document.querySelector('header nav');
const remove = document.querySelector('#removeSidebar');
const inputButton = document.querySelector('#inputButton');
const rightSide = document.querySelector('#rightSide');

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
  const dataTarget = document.querySelector('#data');
  if (dataTarget !== null) {
    dataTarget.remove();
  }
}
// calls clearDom, creates div for dailyWeather class
// maps through object, gets type name and changes int to weathercode
// returns new array with today's data
function setData(object, cityName) {
  clearDom();
  console.log('Setting data...');
  const dataWrapper = document.createElement('div');
  dataWrapper.id = 'data';
  console.log(object);
  const myObject = new dailyWeather(object, cityName);
  dataWrapper.append(myObject);
  rightSide.append(dataWrapper);
}
// calls weather API, takes data and calls setData to set data in DOM
// "https://api.open-meteo.com/v1/forecast?latitude=52.305554&longitude=4.6926644&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin"
async function weatherData(params, cityName) {
  const response =
    await fetch(`https://api.open-meteo.com/v1/forecast?${params}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Europe%2FBerlin`);
  const json1 = await response.json();
  // console.log(json1);
  const daily = Object.entries(json1)[8];
  console.log(daily[1]);
  const object = Object.entries(daily[1]);
  console.log(object);
  setData(object, cityName);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
}
// gets the coordinates of the city with nominatim API, calls weatherData() with coordinates
async function fetchData(params, cityName) {
  const response =
    await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
  let json2 = await response.json();
  json2 = json2[0];
  console.log(json2.lat, json2.lon);
  const params1 = new URLSearchParams({
    latitude: json2.lat,
    longitude: json2.lon
  });
  weatherData((params1.toString()), cityName);
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
    fetchData(params.toString(), params.get('city'));
    console.log(params.toString(), params.get('city'));
  }
});

