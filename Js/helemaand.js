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
        console.log("Knop 'Toon overzicht' is geklikt.");

        // Haal de waarde (value) op van de optie die de gebruiker heeft gekozen in de dropdown.
        const geselecteerdeProvincie = provincieSelect.value;
        
        // Controleer of de gebruiker wel een provincie heeft geselecteerd.
        if (geselecteerdeProvincie) {
            // Log de geselecteerde provincie naar de console.
            console.log(`De gebruiker heeft provincie '${geselecteerdeProvincie}' gekozen.`);

            // Toon een tijdelijke laadmelding in de container.
            
            voorspellingContainer.innerHTML = `<p>Gegevens voor ${geselecteerdeProvincie} worden geladen...</p>`;
            
        } else {
            // Log een waarschuwing als er geen provincie is geselecteerd.
            console.warn("Geen provincie geselecteerd.");
            // Toon een foutmelding in de container.
            voorspellingContainer.innerHTML = "<p>Selecteer alstublieft eerst een provincie.</p>";
            console.warn("Gebruiker klikte zonder een provincie te selecteren.");
            voorspellingContainer.innerHTML = "<p>Selecteer alstublieft eerst een provincie.</p>";
        }
    });

});