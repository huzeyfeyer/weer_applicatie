window.addEventListener("DOMContentLoaded", () => {

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
