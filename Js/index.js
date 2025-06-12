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
//achtergrond en icoon worden aangepast
}); 