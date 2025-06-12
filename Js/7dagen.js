const forecastEl = document.getElementById('forecast');
const errorEl = document.getElementById('error');
const buttons = document.querySelectorAll('.option-btn');

//
function formatDay(dateString) {
    return new Date(dateString).toLocaleDateString('nl-NL', { weekday: 'long' });
  }

//neerslag icons 
  function getIconAndType(precipMM) {
    if (precipMM > 0) {
      return { icon: 'cloud_rain', type: 'Regen' };
    }
    return { icon: 'wb_sunny', type: 'Geen neerslag' };
  }

  //kaart aanmeken voor de dagen
  function showForecast(data) {
    forecastEl.innerHTML = '';
    errorEl.textContent = '';
    if (!data || !data.daily) {
      showError('Geen weersgegevens beschikbaar');
      return;
    }
    for (let i = 0; i < 7; i++) {
      const day = {
        date: data.daily.time[i],
        tempMax: data.daily.temperature_2m_max[i],
        tempMin: data.daily.temperature_2m_min[i],
        precipitation: data.daily.precipitation_sum[i]
      };
      const dayName = formatDay(day.date);
      const { icon, type } = getIconAndType(day.precipitation);

      const card = document.createElement('section');
      card.className = 'day-card';
      card.innerHTML = `
        <div class="day-name">${capitalize(dayName)}</div>
        <span class="material-icons" aria-hidden="true">${icon}</span>
        <div class="temp-max" aria-label="Maximale temperatuur">${Math.round(day.tempMax)}°C</div>
        <div class="temp-min" aria-label="Minimale temperatuur">Min: ${Math.round(day.tempMin)}°C</div>
        <div class="precipitation" aria-label="Neerslag hoeveelheid en type">
          <span class="material-icons" aria-hidden="true">${icon}</span>
          ${day.precipitation.toFixed(1)} mm ${type}
        </div>
      `;
      forecastEl.appendChild(card);
    }
  }

  // Capitalizes first letter
  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function showError(message) {
    forecastEl.innerHTML = '';
    errorEl.textContent = message;
  }

  // Fetch weather using Open-Meteo API for given latitude and longitude
  async function fetchWeatherByCoords(lat, lon) {
    try {
      errorEl.textContent = '';
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe/Brussels`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Fout bij ophalen weergegevens');
      const data = await response.json();
      showForecast(data);
    } catch (e) {
      showError(e.message);
    }
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const lat = button.getAttribute('data-lat');
      const lon = button.getAttribute('data-lon');
      fetchWeatherByCoords(lat, lon);
    });
  });

  // On load, fetch Brussels weather by default
  window.addEventListener('load', () => {
    const defaultBtn = document.querySelector('.option-btn[data-lat="50.8503"]');
    if (defaultBtn) {
      defaultBtn.click();
    }
  });