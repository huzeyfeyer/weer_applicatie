window.addEventListener("DOMContentLoaded", () => {

    //ophalen van setup data
const datePicker = document.getElementById('datumKiezer');
const locationSelector = document.getElementById("provincieSelect");
const geoButton = document.getElementById("gebruikLocatieBtn");
const toonWeerKnop = document.getElementById("toonWeerKnop");
const hourlyContainer = document.getElementById("hourly-weather-container");
const advisoryPanel = document.getElementById("work-advisory");
const ctx = document.getElementById('neerslagGrafiek').getContext('2d');
const bodyElement = document.body;

let weatherChart = null;
let weatherData = null;

 // Vul datum automatisch in met vandaag
datePicker.value = new Date().toISOString().split("T")[0];


// seizoen drempels
const seasonalThresholds = {
    winter: 300,
    lente: 250,
    zomer: 260,
    herfst: 280,
};

// aanduiden seizoen en maanden (nu met Nederlandse seizoensnamen)
function getSeason(month) {
    if ([12, 1, 2].includes(month)) return "winter";
    if ([3, 4, 5].includes(month)) return "lente";
    if ([6, 7, 8].includes(month)) return "zomer";
    if ([9, 10, 11].includes(month)) return "herfst";
}

// weericoon en achtergrond ophalen
function getWeatherInfo(code) {
    const map = {
        0: { icon: "wi-day-sunny", bg: "sunny.jpg" },
        1: { icon: "wi-day-cloudy", bg: "cloudy.jpg" },
        2: { icon: "wi-cloud", bg: "cloudy.jpg" },
        3: { icon: "wi-cloudy", bg: "overcast.jpg" },
        61: { icon: "wi-rain", bg: "rain.jpg" },
        95: { icon: "wi-thunderstorm", bg: "thunderstorm.jpg" },
    };
    return map[code] || { icon: "wi-na", bg: "default.jpg" };
}

  // Weerdata ophalen  van API + foutcontrole
  async function fetchWeatherData(lat, lon) {
    const datum = datePicker.value;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,weathercode,windspeed_10m&current_weather=true&past_days=30&timezone=Europe/Brussels`;
     try {
    const res = await fetch(url);
      weatherData = await res.json();

      const current = {
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weathercode: weatherData.current_weather.weathercode,
        precipitation: weatherData.hourly.precipitation[
          weatherData.hourly.time.indexOf(weatherData.current_weather.time)
        ]
      };

      updateWorkAdvisory(current);
      displayHourlyData(datum);
      displayPrecipitationChart();
          } catch (e) {
      console.error("Fout bij ophalen data:", e);
      hourlyContainer.innerHTML = "<p>Data kon niet geladen worden.</p>";
    }
  }
 //Gebruik huidige locatie
  geoButton.addEventListener("click", () => {
    navigator.geolocation?.getCurrentPosition(
      pos => fetchWeatherData(pos.coords.latitude, pos.coords.longitude),
      () => alert("Locatie niet beschikbaar.")
    );
  });

  // Toon weer op basis van provincie
  toonWeerKnop.addEventListener("click", () => {
    const option = locationSelector.selectedOptions[0];
    const datum = datePicker.value;
    if (!option?.dataset.lat || !datum) {
      alert("Kies een provincie en datum.");
      return;
    }
    fetchWeatherData(option.dataset.lat, option.dataset.lon);
  });

}); 