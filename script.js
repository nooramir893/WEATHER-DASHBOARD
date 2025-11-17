// script.js - Weather Dashboard
// Your API key (as requested, inserted exactly)
const API_KEY = "ccee8f0ec4a9e8430012c914f5b59404";

const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const messageEl = document.getElementById('message');

const mainCard = document.getElementById('mainCard');
const cityNameEl = document.getElementById('cityName');
const countryEl = document.getElementById('country');
const tempEl = document.getElementById('temp');
const descEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const feelsEl = document.getElementById('feels');
const weatherIconEl = document.getElementById('weatherIcon');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');
const coordsEl = document.getElementById('coords');
const saveBtn = document.getElementById('saveBtn');
const clearSavedBtn = document.getElementById('clearSaved');
const cardsGrid = document.getElementById('cardsGrid');

let lastFetched = null;

// Utility: show messages
function showMessage(text, timeout = 4000) {
  messageEl.textContent = text;
  if (timeout) {
    setTimeout(() => {
      if (messageEl.textContent === text) messageEl.textContent = '';
    }, timeout);
  }
}

// Convert unix timestamp + timezone offset -> local hh:mm
function toLocalTime(ts, tzOffset) {
  const date = new Date((ts + tzOffset) * 1000);
  return date.toUTCString().match(/\d{2}:\d{2}/)[0];
}

function setBackgroundForWeather(main) {
  // Choose gradient background per main weather type
  const body = document.body;
  switch ((main || '').toLowerCase()) {
    case 'clear':
      body.style.background = 'linear-gradient(180deg,#0b3b5a 0%, #225e8b 100%)';
      break;
    case 'clouds':
      body.style.background = 'linear-gradient(180deg,#27384a 0%, #374a5c 100%)';
      break;
    case 'rain':
    case 'drizzle':
      body.style.background = 'linear-gradient(180deg,#232a36 0%, #264254 100%)';
      break;
    case 'thunderstorm':
      body.style.background = 'linear-gradient(180deg,#1b2530 0%, #2a3b47 100%)';
      break;
    case 'snow':
      body.style.background = 'linear-gradient(180deg,#1b2b3b 0%, #5a8aa3 100%)';
      break;
    default:
      body.style.background = 'linear-gradient(180deg,#071028 0%, #0f2030 100%)';
  }
}

// Fetch current weather by city (OpenWeatherMap current weather endpoint)
async function fetchWeatherByCity(city) {
  const base = 'https://api.openweathermap.org/data/2.5/weather';
  const url = `${base}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  try {
    showMessage('Loading...');
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      const err = data && data.message ? data.message : 'Failed to fetch';
      showMessage(`Error: ${err}`, 5000);
      throw new Error(err);
    }
    showMessage('');
    return data;
  } catch (err) {
    showMessage(`Network error: ${err.message}`, 6000);
    throw err;
  }
}

// Render main card with full details
function renderMainCard(data) {
  if (!data) return;
  lastFetched = data;

  const { name, sys, main, weather, wind, coord, timezone } = data;
  const w = weather && weather[0];
  cityNameEl.textContent = name;
  countryEl.textContent = sys && sys.country ? sys.country : '';
  tempEl.textContent = `${Math.round(main.temp)}°C`;
  descEl.textContent = w ? w.description : '';
  humidityEl.textContent = `${main.humidity}%`;
  windEl.textContent = `${wind.speed} m/s`;
  feelsEl.textContent = `${Math.round(main.feels_like)}°C`;
  const iconUrl = w ? `https://openweathermap.org/img/wn/${w.icon}@2x.png` : '';
  weatherIconEl.src = iconUrl;
  weatherIconEl.alt = w ? w.description : '';

  sunriseEl.textContent = sys && sys.sunrise ? toLocalTime(sys.sunrise, timezone) : '--';
  sunsetEl.textContent = sys && sys.sunset ? toLocalTime(sys.sunset, timezone) : '--';
  coordsEl.textContent = coord ? `${coord.lat.toFixed(2)}, ${coord.lon.toFixed(2)}` : '--';

  // show
  mainCard.classList.remove('hidden');

  // change background
  setBackgroundForWeather(w && w.main);

  // enable save button
  saveBtn.disabled = false;
}

// Create a small saved city card
function createSmallCard(data) {
  const { name, sys, main, weather } = data;
  const w = weather && weather[0];
  const el = document.createElement('div');
  el.className = 'small-card';
  el.innerHTML = `
    <div class="sc-left">
      <h3>${name} <small class="sc-meta"> ${sys.country || ''}</small></h3>
      <div class="sc-meta">${w ? w.description : ''}</div>
    </div>
    <div style="text-align:right">
      <img src="${w ? `https://openweathermap.org/img/wn/${w.icon}.png` : ''}" alt="${w ? w.description : ''}" />
      <div class="sc-temp">${Math.round(main.temp)}°C</div>
      <div class="sc-meta">H:${main.humidity}%</div>
    </div>
  `;
  el.addEventListener('click', () => {
    // clicking a saved card shows it as main
    renderMainCard(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  return el;
}

// Saved cities management (store raw API response for each saved city)
function getSaved() {
  try {
    const raw = localStorage.getItem('saved_weather_v1');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function setSaved(list) {
  localStorage.setItem('saved_weather_v1', JSON.stringify(list.slice(0, 8)));
}

// Render saved grid
function renderSavedGrid() {
  cardsGrid.innerHTML = '';
  const saved = getSaved();
  if (!saved.length) {
    cardsGrid.innerHTML = `<div class="message">No saved cities. Save a city to see quick cards here.</div>`;
    return;
  }
  saved.forEach(item => {
    const c = createSmallCard(item);
    cardsGrid.appendChild(c);
  });
}

// Save current fetch to saved list
function saveCurrent() {
  if (!lastFetched) {
    showMessage('Nothing to save yet.');
    return;
  }
  const saved = getSaved();
  // avoid duplicates by name+country
  const key = `${lastFetched.name.toLowerCase()}_${(lastFetched.sys && lastFetched.sys.country)||''}`.trim();
  const exists = saved.some(s => `${s.name.toLowerCase()}_${(s.sys && s.sys.country)||''}`.trim() === key);
  if (exists) {
    showMessage('City already saved.');
    return;
  }
  saved.unshift(lastFetched); // newest first
  setSaved(saved);
  renderSavedGrid();
  showMessage('Saved to dashboard.');
}

// Clear saved
function clearSaved() {
  localStorage.removeItem('saved_weather_v1');
  renderSavedGrid();
  showMessage('Saved cities cleared.');
}

// Handle form submit
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) {
    showMessage('Please enter a city name.');
    return;
  }
  try {
    const data = await fetchWeatherByCity(city);
    renderMainCard(data);
  } catch (err) {
    // fetchWeatherByCity already shows message
    mainCard.classList.add('hidden');
  }
});

// Save + clear buttons
saveBtn.addEventListener('click', () => saveCurrent());
clearSavedBtn.addEventListener('click', () => {
  if (confirm('Clear all saved cities?')) clearSaved();
});

// initial render
(function init() {
  renderSavedGrid();
  // attempt to show the last saved as main
  const saved = getSaved();
  if (saved && saved.length) {
    renderMainCard(saved[0]);
  } else {
    // welcome message
    showMessage('Welcome! Search a city to see live weather.');
  }
})();
