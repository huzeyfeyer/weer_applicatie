# Weerdata Applicatie

Deze applicatie toont weergegevens en geeft waarschuwingen in geval van een mogelijke overstromingsrisico of droogte.

## Functionaliteiten

- **Overzicht per dag en maand**: Bekijk het weer, neerslag en risico's per provincie of op basis van je locatie.
- **Overstromings- en droogtewaarschuwingen**: Het systeem geeft automatisch waarschuwingen bij risicovolle neerslaghoeveelheden per dag, week of maand.
- **Interactieve grafieken**: Visualisatie van neerslagdata en drempelwaarden voor overstroming en droogte aan de hand van een grafiek.
- **Safety tips**: Adviezen en richtlijnen voor technische medewerkers bij droogte of overstroming.

## Gebruik

1. **Start de applicatie**  
   Open [HTML/Index.html](HTML/Index.html) in je browser.

2. **Kies een provincie of gebruik je locatie**  
   - Selecteer een provincie en datum, of klik op "Gebruik mijn locatie".  
   - Klik op "Toon Weer" voor een uurlijkse en maandelijkse analyse.

3. **Bekijk waarschuwingen**  
   - Bij zware neerslag (>10mm/uur) verschijnt een overstromingswaarschuwing.  
   - Bij zeer weinig neerslag (<0.1mm/uur) verschijnt een droogtewaarschuwing.

4. **Bekijk details**  
   - Klik op "Maand Overzicht" voor een tabel met waarschuwingen per dag.  
   - Klik op een dag met waarschuwing voor meer safety tips.

## Bestandenstructuur

- **HTML/**: Bevat de verschillende pagina's (Index, 7dagen, Helemaand, droogte, overstroming).  
- **CSS/**: Stijlen voor de applicatie.  
- **Js/**: JavaScript-bestanden voor logica en API-koppeling.  
  **Img/**: Afbeeldingen op pagina 7 dagen.

## Bronnen

- **Blackbox AI Chat**: [Blackbox Chat 1](https://www.blackbox.ai/chat/RQ978ys) .
- **Blackbox AI Chat**: [Blackbox Chat 2](https://www.blackbox.ai/chat/3cOo1Av) .
   **Afbeelding Aquafin**:(https://images.app.goo.gl/dLyuzwY6vUmjrNQK9)
  **Dynamische grafiek**:(https://github.com/chartjs/Chart.js)


## Technische details

- **Weerdata**: Opgehaald via de Open-Meteo API.  
- **Risicodrempels**: /uur.  
- **Grafieken**: Gerealiseerd met Chart.js.

## Installatie

Geen installatie nodig. Open de gewenste HTML-pagina in je browser. Voor lokale API-calls kan een live server (zoals VS Code Live Server) handig zijn.

