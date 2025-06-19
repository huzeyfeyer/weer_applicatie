# Weerdata Applicatie

Deze applicatie is een weerapplicatie die veiligheid en werkplanning ondersteunt voor de techniekers van Aquafin. Omdat weersomstandigheden zoals droogte of overstromingen een directe impact hebben op hun werk, biedt deze tool uurlijkse neerslagvoorspellingen, visuele grafieken en gerichte adviezen. De applicatie speelt in op reële noden die via gesprekken met technieker Gwen Temperman werden blootgelegd.

## Design Thinking

**Probleem:** Techniekers moeten hun werk afstemmen op het weer, maar beschikten niet over een praktische tool die weersinformatie combineert met veiligheidsadvies.  
**Oplossing:** Een webapplicatie die actuele neerslaggegevens visualiseert en advies geeft bij droogte of overstroming. Techniekers kunnen snel per locatie bekijken wat het weerbeeld is en hoe ze hun materiaalgebruik daarop moeten afstemmen.

## Analyse & structuur

De applicatie bevat:

- Een homepagina met welkomsttekst en knoppen naar functionaliteiten  
- Neerslagoverzicht per uur en per maand (via grafieken)  
- Aparte adviespagina’s voor droogte en overstroming  
- Styling met Tailwind en consistente navigatie  
- Gebruiksvriendelijke interface ontwikkeld in HTML, CSS en JavaScript  
- Ingebouwde foutafhandeling en inputvalidatie via JavaScript

## Coderingsmethodes & kwaliteitsbewaking

- Duidelijke mapstructuur (`/html`, `/css`, `/js`, `/img`)
- JavaScript-functies per feature opgebouwd (grafiek laden, locatie selecteren, waarschuwing tonen)
- Validatie van invoer en foutmeldingen in console
- Consistente opbouw en layout via Tailwind CSS
- Responsief design getest op desktop en mobiel

## Database en Git

- Geen relationele database nodig: de applicatie werkt met statische JSON-bestanden en externe API
- Ontwikkeling via Git en GitHub, met commits per feature
- Opdeling in aparte bestanden en mappen per componenttype

## Inhoudsopgave

- [Technologieën](#technologieën)  
- [Functionaliteiten](#functionaliteiten)  
- [Gebruik](#gebruik)  
- [Bestandenstructuur](#bestandenstructuur)  
- [Testen](#testen)  
- [Projectplanning](#projectplanning)  
- [Team en werkverdeling](#team-en-werkverdeling)  
- [Bronnen en digitale hulpmiddelen](#bronnen-en-digitale-hulpmiddelen)  
- [Contributie](#contributie)  
- [Licentie](#licentie)

## Technologieën

### Frontend

- HTML5  
- Tailwind CSS  
- JavaScript ES6  
- Chart.js (voor visualisatie)  
- JSON (voor dataopslag & testdata)

### API

- Open-Meteo (voor externe weerdata)

## Functionaliteiten

### Weergave & Advies

- Neerslagvoorspelling per uur, dag en maand  
- Dynamische grafieken met waarschuwingsdrempels  
- Automatische en manuele locatiekeuze  
- Veiligheidsadvies bij droogte of overstroming

### Navigatie & Interface

- Responsieve layout  
- Visueel onderscheid tussen adviespagina’s  
- Snelle toegang tot maandoverzicht en terugknoppen

### Validatie & Foutafhandeling

- Detectie van ongeldige input  
- Waarschuwingen bij lege selectie  
- Console logging voor debugging

## Gebruik

1. Download of clone de repo  
2. Open `index.html` lokaal in je browser  
3. Kies je provincie of activeer je locatie  
4. Navigeer naar adviespagina’s of bekijk de maandgrafiek

## Bestandenstructuur

/html/ # index.html, helemaand.html, droogte.html, overstroming.html
/css/ # global.css, detail.css
/js/ # script.js, chart.js, api.js
/img/ # illustraties en iconen
/data/ # testdata in JSON (optioneel)


## Testen

- Locatiefunctie getest met manuele en automatische input  
- Dropdowns en knoppenvalidering  
- Waarschuwingen tonen bij overschrijding van limieten  
- Grafiekweergave correct per uur en per dag  
- Navigatie getest op mobiel en desktop


## Bronnen en digitale hulpmiddelen

- [Chart.js](https://www.chartjs.org/) – interactieve grafieken  
- [Open-Meteo](https://open-meteo.com/) – weerdata API  
- [ChatGPT](https://chat.openai.com/) – validatie, foutoplossing  en structuur readme.
- [Blackbox Chat](https://www.blackbox.ai/chat/RQ978ys) – debuggingondersteuning  
- [Aquafin illustratie](https://images.app.goo.gl/dLyuzwY6vUmjrNQK9)  

## Mappenstructuur
![image](https://github.com/user-attachments/assets/52657718-db22-4170-b6bb-c834f1907c1f)


