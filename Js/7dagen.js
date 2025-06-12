document.getElementById('zoekButton').addEventListener('click', async () => {
    const input = document.getElementById('zoekInput').value.trim();

    // Voorbeeld: vaste coördinaten voor Gent als fallback
    let latitude = 51.05;
    let longitude = 3.7167;

    // Je kunt hier eventueel een mapping maken van steden naar coördinaten
    // of een geocoding API gebruiken om input om te zetten naar coördinaten

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=GMT`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Netwerkfout bij het ophalen van de gegevens');
        }
        const data = await response.json();
        displayWeather(data.daily);
    } catch (error) {
        console.error('Er is een fout opgetreden:', error);
        document.getElementById('weerResultaten').innerHTML = '<p>Er is een fout opgetreden bij het ophalen van de weergegevens.</p>';
    }
});

function displayWeather(dailyData) {
    const weerResultaten = document.getElementById('weerResultaten');
    weerResultaten.innerHTML = '';
    dailyData.time.forEach((date, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${new Date(date).toLocaleDateString('nl-BE', { weekday: 'long' })}</h2>
            <p>Temperatuur: ${dailyData.temperature_2m_max[index]}°C</p>
            <p>Min: ${dailyData.temperature_2m_min[index]}°C</p>
            <p>Neerslag: ${dailyData.precipitation_sum[index]}mm</p>
        `;
        weerResultaten.appendChild(card);
    });
}