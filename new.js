// bewaar het antwoord in localstorage
// met fetch options objecten maken die gebruiker kan invoeren
//https://publicapis.io/nominatim-api
// https://www.weer.nl/
// https://www.weerplaza.nl/weerwidgets/
// https://appshots.design/apps/nothing-weather-komponent-app-shot-nothing_weather_
// this.childNodes().forEach(node => ... node.remove()) 
// https://dribbble.com/shots/19207866-Weather-Forecast-Dashboard
import { dailyWeather } from './dailyWeather.js';
import { currentWeather } from './currentWeather.js';
import { weeklyWeather } from './weekInfo.js';

const button = document.querySelector('#button1');
const nav1 = document.querySelector('header nav');
const remove = document.querySelector('#removeSidebar');
const inputButton = document.querySelector('#inputButton');
const rightSide = document.querySelector('#rightSide');
const currentDataWrapper = document.querySelector('#currentDataWrapper');
const weekWrapper = document.querySelector('#weekWrapper');

const weatherCode = {
  0: { code: 'Clear sky', png: 'V2_icons/large/png/10000_clear_large@2x.png' },
  1: { code: 'Mainly clear', png: 'V2_icons/large/png/11000_mostly_clear_large@2x.png' },
  2: { code: 'Partly cloudy', png: 'V2_icons/large/png/11010_partly_cloudy_large@2x.png' },
  3: { code: 'Overcast', png: 'V2_icons/large/png/10010_cloudy_large@2x.png' },
  45: { code: 'Fog', png: 'V2_icons/large/png/20000_fog_large@2x.png' },
  46: { code: 'Depositing rime fog', png: 'V2_icons/large/png/71030_wintry_mix_large@2x.png' },
  51: { code: 'Light drizzle', png: 'V2_icons/large/png/40000_drizzle_large@2x.png' },
  53: { code: 'Moderate drizzle', png: 'V2_icons/large/png/40000_drizzle_large@2x.png' },
  55: { code: 'Dense drizzle', png: 'V2_icons/large/png/40000_drizzle_large@2x.png' },
  56: { code: 'Light freezing drizzle', png: 'V2_icons/large/png/60000_freezing_rain_drizzle_large@2x.png' },
  57: { code: 'Dense freezing drizzle', png: 'V2_icons/large/png/60000_freezing_rain_drizzle_large@2x.png' },
  61: { code: 'Slight rain', png: 'V2_icons/large/png/42000_rain_light_large@2x.png' },
  63: { code: 'Moderate rain', png: 'V2_icons/large/png/40010_rain_large@2x.png' },
  65: { code: 'Heavy rain', png: 'V2_icons/large/png/42010_rain_heavy_large@2x.png' },
  66: { code: 'Light freezing rain', png: 'V2_icons/large/png/62000_freezing_rain_light_large@2x.png' },
  67: { code: 'Heavy freezing rain', png: 'V2_icons/large/png/60010_freezing_rain_large@2x.png' },
  71: { code: 'Slight snow fall', png: 'V2_icons/large/png/51000_snow_light_large@2x.png' },
  73: { code: 'Moderate snow fall', png: 'V2_icons/large/png/50000_snow_large@2x.png' },
  75: { code: 'Heavy snow fall', png: 'V2_icons/large/png/51010_snow_heavy_large@2x.png' },
  77: { code: 'Snow grains', png: 'V2_icons/large/png/51220_wintry_mix_large@2x.png' },
  80: { code: 'Slight rain showers', png: 'V2_icons/large/png/40010_rain_large@2x.png' },
  81: { code: 'Moderate rain showers', png: 'V2_icons/large/png/42010_rain_heavy_large@2x.png' },
  82: { code: 'Violent rain showers', png: 'V2_icons/large/png/42010_rain_heavy_large@2x.png' },
  85: { code: 'Slight snow showers', png: 'V2_icons/large/png/51000_snow_light_large@2x.png' },
  86: { code: 'Heavy snow showers', png: 'V2_icons/large/png/51010_snow_heavy_large@2x.png' },
  95: { code: 'Thunderstorm', png: 'V2_icons/large/png/80000_tstorm_large@2x.png' },
  96: { code: 'Thunderstorm with slight hail', png: 'V2_icons/large/png/80000_tstorm_large@2x.png' },
  99: { code: 'Thunderstorm with heavy hail', png: 'V2_icons/large/png/80000_tstorm_large@2x.png' }
};

const weatherNumSmall = {
  0: { code: 'Clear sky', png: 'V2_icons/small/png/10000_clear_small@2x.png' },
  1: { code: 'Mainly clear', png: 'V2_icons/small/png/11000_mostly_clear_small@2x.png' },
  2: { code: 'Partly cloudy', png: 'V2_icons/small/png/11010_partly_cloudy_small@2x.png' },
  3: { code: 'Overcast', png: 'V2_icons/small/png/10010_cloudy_small@2x.png' },
  45: { code: 'Fog', png: 'V2_icons/small/png/20000_fog_small@2x.png' },
  46: { code: 'Depositing rime fog', png: 'V2_icons/small/png/71030_wintry_mix_small@2x.png' },
  51: { code: 'Light drizzle', png: 'V2_icons/small/png/40000_drizzle_small@2x.png' },
  53: { code: 'Moderate drizzle', png: 'V2_icons/small/png/40000_drizzle_small@2x.png' },
  55: { code: 'Dense drizzle', png: 'V2_icons/small/png/40000_drizzle_small@2x.png' },
  56: { code: 'Light freezing drizzle', png: 'V2_icons/small/png/60000_freezing_rain_drizzle_small@2x.png' },
  57: { code: 'Dense freezing drizzle', png: 'V2_icons/small/png/60000_freezing_rain_drizzle_small@2x.png' },
  61: { code: 'Slight rain', png: 'V2_icons/small/png/42000_rain_light_small@2x.png' },
  63: { code: 'Moderate rain', png: 'V2_icons/small/png/40010_rain_small@2x.png' },
  65: { code: 'Heavy rain', png: 'V2_icons/small/png/42010_rain_heavy_small@2x.png' },
  66: { code: 'Light freezing rain', png: 'V2_icons/small/png/62000_freezing_rain_light_small@2x.png' },
  67: { code: 'Heavy freezing rain', png: 'V2_icons/small/png/60010_freezing_rain_small@2x.png' },
  71: { code: 'Slight snow fall', png: 'V2_icons/small/png/51000_snow_light_small@2x.png' },
  73: { code: 'Moderate snow fall', png: 'V2_icons/small/png/50000_snow_small@2x.png' },
  75: { code: 'Heavy snow fall', png: 'V2_icons/small/png/51010_snow_heavy_small@2x.png' },
  77: { code: 'Snow grains', png: 'V2_icons/small/png/51220_wintry_mix_small@2x.png' },
  80: { code: 'Slight rain showers', png: 'V2_icons/small/png/40010_rain_small@2x.png' },
  81: { code: 'Moderate rain showers', png: 'V2_icons/small/png/42010_rain_heavy_small@2x.png' },
  82: { code: 'Violent rain showers', png: 'V2_icons/small/png/42010_rain_heavy_small@2x.png' },
  85: { code: 'Slight snow showers', png: 'V2_icons/small/png/51000_snow_light_small@2x.png' },
  86: { code: 'Heavy snow showers', png: 'V2_icons/small/png/51010_snow_heavy_small@2x.png' },
  95: { code: 'Thunderstorm', png: 'V2_icons/small/png/80000_tstorm_small@2x.png' },
  96: { code: 'Thunderstorm with slight hail', png: 'V2_icons/small/png/80000_tstorm_small@2x.png' },
  99: { code: 'Thunderstorm with heavy hail', png: 'V2_icons/small/png/80000_tstorm_small@2x.png' }
};

window.onload = () => {
  const inputCity = document.querySelector('#city').value;
  const params = new URLSearchParams({
    city: inputCity,
    format: 'jsonv2',
  });
  fetchData(params.toString(), params.get('city'));
};

button.addEventListener('click', () => {
  nav1.classList.toggle('visible');
});

remove.addEventListener('click', () => {
  nav1.classList.remove('visible');
});

// clears the DOM ... :D
function clearDom() {
  const dataTarget = document.querySelector('#data');
  const currentTarget = document.querySelector('#currentData');
  if (dataTarget !== null && currentTarget !== null) {
    dataTarget.remove();
    currentTarget.remove();
  }
}

function updateData() {
  const current = document.querySelector('.currentWeather');
  const weekly = document.querySelector('.weeklyWeather')
  current.resetData();
  weekly.resetData();
}

document.querySelector('#button2').addEventListener('click', () => {
  updateData();
}); 

// calls clearDom, creates div for dailyWeather class
// maps through object, gets type name and changes int to weathercode
// returns new array with today's data
function setData(object, cityName) {
  clearDom();
  console.log('Setting data...');
  const dataWrapper = document.createElement('div');
  dataWrapper.id = 'data';
  // console.log(object);
  const myObject = new weeklyWeather(object, cityName, weatherNumSmall);
  dataWrapper.append(myObject);
  weekWrapper.append(dataWrapper);
}
// calls the currentWeather class with weather data
function setCurrent(object, city) {
  clearDom();
  console.log('setting current data...');
  const currentData = document.createElement('div');
  currentData.id = 'currentData';
  const newCurrent = new currentWeather(object, city, weatherCode);
  currentData.append(newCurrent);
  currentDataWrapper.append(currentData);
}
// calls weather API, takes data and calls setData to set data in DOM
// "https://api.open-meteo.com/v1/forecast?latitude=52.305554&longitude=4.6926644&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin"
async function weatherData(params, cityName) {
  const response =
    await fetch(`https://api.open-meteo.com/v1/forecast?${params}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Europe%2FBerlin`);
  const json1 = await response.json();
  // console.log(json1);
  const daily = Object.entries(json1)[8];
  // console.log(daily[1]);
  const object = Object.entries(daily[1]);
  // console.log(object);
  setData(object, cityName);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
}
// fetches weather API and calls setCurrent function for current data  
async function currentData(params, cityName) {
  const response =
    await fetch(`https://api.open-meteo.com/v1/forecast?${params}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m`);
  const json3 = await response.json();
  console.log(Object.entries(json3)[8][1]);
  const current = Object.entries(json3);
  setCurrent(current, cityName);
}

// gets the coordinates of the city with nominatim API, calls weatherData() with coordinates
async function fetchData(params, cityName) {
  const response =
    await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
  let json2 = await response.json();
  // console.log(json2);
  json2 = json2[0];
  console.log(json2.lat, json2.lon);
  const params1 = new URLSearchParams({
    latitude: json2.lat,
    longitude: json2.lon
  });
  weatherData((params1.toString()), cityName);
  currentData((params1.toString()), cityName);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
}
// checks if input is a number or a invalid string and throws an error
function handleData(inputValue) {
  const exp = /^[A-Za-z ]+$/;
  console.log(exp.test(inputValue));
  try {
    // if (Number(inputValue)) throw 'a number, please enter a city.'; 
    if (!exp.test(inputValue)) throw 'is invalid, please enter a city.';
  }
  catch (error) {
    alert('Input is ' + error);
  }
}
// listens for submit button click, checks for input and calls fetchData()
inputButton.addEventListener('click', () => {
  const inputCity = document.querySelector('#city').value;
  if (inputCity !== '') {
    handleData(inputCity);
    const params = new URLSearchParams({
      city: inputCity,
      format: 'jsonv2',
    });
    fetchData(params.toString(), params.get('city'));
  }
});
// listens for keypress (enter) in the input field
document.querySelector('#city').addEventListener('keypress', (event) => {
  const inputCity = document.querySelector('#city').value;
  if (inputCity !== '' && event.key === 'Enter') {
    handleData(inputCity);
    const params = new URLSearchParams({
      city: inputCity,
      format: 'jsonv2',
    });
    fetchData(params.toString(), params.get('city'));
  }
});
