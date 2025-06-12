window.addEventListener("DOMContentLoaded", () => {

// ophalen van setup data
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

// weer per uur laten verschijnen
    function displayHourlyData(date) {
        hourlyContainer.innerHTML = "";
        if (!weatherData) return;

        const { time, temperature_2m, precipitation } = weatherData.hourly;

        time.forEach((t, i) => {
            const [d, h] = t.split("T");
            const hour = new Date(t).getHours();
            if (d === date && hour >= 6 && hour <= 22) {
                const temp = temperature_2m[i].toFixed(1);
                const prec = precipitation[i].toFixed(1);
                let risk = "Normaal", cls = "";

                if (prec > 5) [risk, cls] = ["Overstroming", "text-danger"];
                else if (prec < 0.1) [risk, cls] = ["Droogte", "text-warning"];

                hourlyContainer.innerHTML += `
                    <div class="weather-card">
                        <h4>${hour}:00</h4>
                        <p>${temp}°C</p>
                        <p>${prec} mm</p>
                        <p class="${cls}">${risk}</p>
                    </div>`;
            }
        });
    }

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
            45: { icon: "wi-fog", bg: "fog.jpg" },
            61: { icon: "wi-rain", bg: "rain.jpg" },
            95: { icon: "wi-thunderstorm", bg: "thunderstorm.jpg" },
        };
        return map[code] || { icon: "wi-na", bg: "default.jpg" };
    }

    // advies tonen op basis van neerslag
    function updateWorkAdvisory(current) {
        let code = "green", title = "", advice = "";

        if (current.precipitation > 10) {
            code = "red";
            title = "Zware neerslag – controleer installaties.";
            advice = "Mogelijke overbelasting riolering.";
        } else if (current.precipitation > 5) {
            code = "yellow";
            title = "Aanhoudende regen.";
            advice = "Graafwerken kunnen hinder ondervinden.";
        } else if (current.precipitation < 0.1) {
            code = "orange";
            title = "Droogte – Let op irrigatie.";
            advice = "Pas beleid aan op droge omstandigheden.";
        } else {
            advisoryPanel.style.display = "none";
            return;
        }

        advisoryPanel.className = `content-section code-${code}`;
        advisoryPanel.innerHTML = `<h3>${title}</h3><p>${advice}</p>`;
        advisoryPanel.style.display = "block";
    }

    // neerslaggrafiek tekenen
    function displayPrecipitationChart() {
        const daily = {};

        weatherData.hourly.time.forEach((t, i) => {
            const d = t.split("T")[0];
            daily[d] = (daily[d] || 0) + weatherData.hourly.precipitation[i];
        });

        const labels = Object.keys(daily);
        const data = Object.values(daily);
        const month = new Date(labels[0]).getMonth() + 1;
        const season = getSeason(month);
        const threshold = seasonalThresholds[season] || 250;

        const flood = Array(labels.length).fill(threshold);
        const drought = Array(labels.length).fill(2);

        if (weatherChart) weatherChart.destroy();

        weatherChart = new Chart(ctx, {
            type: "line",
            data: {
                labels,
                datasets: [
                    { label: "Neerslag (mm)", data, borderColor: "blue", backgroundColor: "rgba(0,0,255,0.1)", fill: true },
                    { label: `Overstroming (${threshold} mm)`, data: flood, borderColor: "red", borderDash: [5, 5], fill: false },
                    { label: "Droogte (2 mm)", data: drought, borderColor: "orange", borderDash: [5, 5], fill: false }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Weerdata ophalen van API + foutcontrole
    async function fetchWeatherData(lat, lon) {
        const datum = datePicker.value;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,weathercode,windspeed_10m&current_weather=true&past_days=30&timezone=Europe/Brussels`;
        try {
            const res = await fetch(url);
            weatherData = await res.json();

            const index = weatherData.hourly.time.indexOf(weatherData.current_weather.time);
            const current = {
                temperature: weatherData.current_weather.temperature,
                windspeed: weatherData.current_weather.windspeed,
                weathercode: weatherData.current_weather.weathercode,
                precipitation: index >= 0 ? weatherData.hourly.precipitation[index] : 0
            };

            updateWorkAdvisory(current);
            displayHourlyData(datum);
            displayPrecipitationChart();
        } catch (e) {
            console.error("Fout bij ophalen data:", e);
            hourlyContainer.innerHTML = "<p>Data kon niet geladen worden.</p>";
        }
    }

    // Gebruik huidige locatie
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