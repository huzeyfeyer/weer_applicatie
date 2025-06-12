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

});