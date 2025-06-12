// Wacht tot de volledige HTML-pagina is geladen.
document.addEventListener('DOMContentLoaded', function() {

    // Een simpele console.log om te controleren of ons script correct is geladen.
    console.log("Stap 1: Script geladen, elementen worden geselecteerd.");

    // Selecteer de HTML-elementen op basis van hun ID en bewaar ze in constanten.
    const provincieSelect = document.getElementById('provincieSelect');
    const toonKnop = document.getElementById('toonOverzichtBtn');
    const voorspellingContainer = document.getElementById('voorspellingContainer');

    // We controleren of de elementen gevonden zijn.
    if (provincieSelect && toonKnop && voorspellingContainer) {
        console.log("Alle benodigde elementen zijn succesvol gevonden op de pagina.");
    } else {
        console.error("Kon niet alle benodigde HTML-elementen vinden. Controleer de ID's in je HTML.");
    }

    // Voeg een 'click' event listener toe aan de knop.
    
    toonKnop.addEventListener('click', function() {

        // Haal de waarde (value) op van de optie die de gebruiker heeft gekozen in de dropdown.
        const geselecteerdeProvincie = provincieSelect.value;
        
        // Controleer of de gebruiker wel een provincie heeft geselecteerd.
        if (geselecteerdeProvincie) {

            // Toon een tijdelijke laadmelding in de container.
            
            voorspellingContainer.innerHTML = `<p>Gegevens voor ${geselecteerdeProvincie} worden geladen...</p>`;
            haalWeerDataOp(geselecteerdeProvincie);
        } else {
            // Als er geen provincie is geselecteerd, geef een foutmelding weer.
            voorspellingContainer.innerHTML = "<p>Selecteer alstublieft eerst een provincie.</p>";
        }
    });


    // Definieer de coördinaten voor elke provincie in België.
    // Deze coördinaten worden gebruikt om de weersvoorspelling op te halen.
    const provincieCoords = {
        'antwerpen': { lat: 51.2194, lon: 4.4025 },
        'limburg': { lat: 50.931, lon: 5.338 },
        'oost-vlaanderen': { lat: 51.0543, lon: 3.7174 },
        'vlaams-brabant': { lat: 50.8833, lon: 4.7 },
        'west-vlaanderen': { lat: 51.2093, lon: 3.2247 }
    };

    async function haalWeerDataOp(provincie) {
        const coords = provincieCoords[provincie];
        if (!coords) {
            console.error(`Geen coördinaten gevonden voor provincie: ${provincie}`);
            voorspellingContainer.innerHTML = `<p>Kon de coördinaten voor ${provincie} niet vinden.</p>`;
            return;
        }

        // Stel de API URL samen met de coördinaten en de gewenste parameters.
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=16&timezone=Europe/Brussels`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                // Als de response niet OK is, gooien we een fout.
                throw new Error(`Netwerkfout: ${response.statusText}`);
            }
            const data = await response.json();

            // Log de opgehaalde data naar de console voor debugging.
            console.log("Opgehaalde weerdata:", data);
            
            
            // voorspellingContainer.innerHTML = `<p>Data voor ${provincie} succesvol opgehaald. Zie de console voor details.</p>`;
            toonVoorspelling(data.daily, provincie);

        } catch (error) {
            console.error("Fout bij het ophalen van de weerdata:", error);
            voorspellingContainer.innerHTML = `<p>Er is een fout opgetreden bij het ophalen van de gegevens.</p>`;
        }
    }

    function vertaalWeercode(code) {
        const weercodes = {
            0: 'Heldere hemel',
            1: 'Grotendeels helder',
            2: 'Deels bewolkt',
            3: 'Zwaarbewolkt',
            45: 'Mist',
            48: 'Rijm',
            51: 'Lichte motregen',
            53: 'Matige motregen',
            55: 'Dichte motregen',
            61: 'Lichte regen',
            63: 'Matige regen',
            65: 'Zware regen',
            80: 'Lichte regenbuien',
            81: 'Matige regenbuien',
            82: 'Hevige regenbuien',
            95: 'Onweer'
        };
        return weercodes[code] || `Onbekend (${code})`;
    }

    function toonVoorspelling(data, provincie) {
        let html = `<h3>Weersvoorspelling voor ${provincie}</h3>`;
        html += '<table class="details-table">'; // Start de tabel met een klasse voor styling
        html += `
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Max Temp.</th>
                    <th>Min Temp.</th>
                    <th>Neerslag (mm)</th>
                    <th>Omschrijving</th>
                </tr>
            </thead>
            <tbody>
        `;

        for (let i = 0; i < data.time.length; i++) {
            const datum = new Date(data.time[i]).toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit', weekday: 'short' });
            html += `
                <tr>
                    <td>${datum}</td>
                    <td>${data.temperature_2m_max[i].toFixed(1)}°C</td>
                    <td>${data.temperature_2m_min[i].toFixed(1)}°C</td>
                    <td>${data.precipitation_sum[i].toFixed(1)}</td>
                    <td>${vertaalWeercode(data.weathercode[i])}</td>
                </tr>
            `;
        }

        html += '</tbody></table>';
        voorspellingContainer.innerHTML = html;
    }
    


});