# Weerdata Applicatie

Deze applicatie is een weerapplicatie, bedoeld voor de techniekers van Aquafin die dagelijks buiten werken. Omdat weersomstandigheden zoals droogte of overstromingen een grote invloed hebben op hun veiligheid en de werkplanning gepland door planners van Aquafin, biedt deze tool hen actuele neerslagvoorspellingen en grafieken om beter te begrijpen hoe het weer zal veranderen over de dag, week of maand. Via adviespagina’s krijgen ze tips over welk materiaal ze het best gebruiken bij extreme weersituaties. Deze inzichten zijn gebaseerd op gesprekken met technieker Gwen Temperman, die concrete noden en risico’s uit de praktijk aanhaalde.

# Design Thinking

**Probleem:** Techniekers van Aquafin werken dagelijks buiten en worden geconfronteerd met risico’s bij droogte of overstromingen. Er was geen eenvoudige tool om weersomstandigheden te raadplegen en werkrisico’s per regio in te schatten.
**Oplossing:** We ontwikkelden een webapplicatie die weerdata visualiseert en tips geeft over hoe techniekers hun werk moeten aanpassen in functie van het weer. Deze bevat een locatiekiezer, uurlijkse neerslagvoorspelling en aparte adviespagina’s.

# Analyse & structuur

De applicatie bevat:

* Homepagina met welkomstboodschap en knoppen
* Neerslagoverzicht met grafiek en kaart (Chart.js + eigen JSON/API)
* Twee aparte adviespagina’s: overstroming & droogte
* Technische opbouw in HTML, Tailwind, JavaScript en JSON-bestanden
* Navigatie- en layoutconsistentie via globale CSS

# Coderingsmethodes & kwaliteitsbewaking

* Heldere mappenstructuur (`js`, `css`, `data`)
* Elke feature is afzonderlijk getest (o.a. provincieknoppen, locatiefunctie)
* Code is gestructureerd met functies, foutafhandeling en inputcontrole

# Planning

* Eerste week: analyse en mockup in Figma
* Tweede week: feedback van Gwen en aanpassing – Homepagina, API, maandoverzicht, weekoverzicht en adviespagina's
* Derde week: Styling & grafieken toegevoegd. Dubbelcheck en testing

# Uitgewerkte analyse

De weerapplicatie bestaat uit statische en dynamische componenten:

* Homepagina met navigatie en toelichting
* Pagina met uurlijkse neerslaggrafiek, op basis van een eigen JSON API
* Twee adviespagina’s met veiligheidsrichtlijnen: droogte en overstroming
* Interactieve dropdowns en locatieknoppen in JavaScript
* Styling via Tailwind en responsief gedrag getest

# Design thinking toegepast

* Werknemers van Aquafin hebben praktische info nodig om zich voor te bereiden op het weer
* De applicatie stelt aangepaste adviezen voor per weersituatie
* Locatie en provincie worden automatisch of manueel geselecteerd

# Volgen van projectplan

* Alle onderdelen werden gerealiseerd binnen de geplande weken (zie planning hierboven)
* Elke component werd afzonderlijk getest en opgebouwd: dataweergave, navigatie, advies

# Git & versiebeheer

* Ontwikkeling gebeurde via branches, regelmatig gecommit
* Opgeslagen in GitHub met hoofdmap en duidelijke structuur

# Functionaliteiten

* Overzicht per dag en maand
* Overstromings- en droogtewaarschuwingen
* Interactieve grafieken
* Safety tips per weersituatie

# Gebruik

1. Start de applicatie door `index.html` te openen in de browser
2. Kies een provincie of gebruik je locatie
3. Bekijk waarschuwingen bij extreme waarden
4. Navigeer naar "maand overzicht" of specifieke tips bij waarschuwingen

# Bestandenstructuur

* `HTML/`: bevat de pagina's (index, 7dagen, helemaand, droogte, overstroming)
* `CSS/`: stijlen voor de applicatie
* `Js/`: JavaScript voor logica en API-koppeling
* `Img/`: afbeeldingen gebruikt in de weekweergave

# Bronnen en digitale hulpmiddelen

- **Blackbox AI Chat**: [Blackbox Chat 1](https://www.blackbox.ai/chat/RQ978ys) .
- **Blackbox AI Chat**: [Blackbox Chat 2](https://www.blackbox.ai/chat/3cOo1Av) .
   **Afbeelding Aquafin**:(https://images.app.goo.gl/dLyuzwY6vUmjrNQK9)
  **Dynamische grafiek**:(https://github.com/chartjs/Chart.js)
  -**API**:(https://open-meteo.com/)
  - **CHATGPT**:(Gebruik bij debuggen van code)

# Technische details

* Weerdata via Open-Meteo API
* Risicodrempels per seizoen (zie README)
* Grafieken via Chart.js

# Installatie

Geen installatie nodig. Open `index.html` of een andere pagina lokaal in de browser. Voor API-functionaliteit is een live server aanbevolen.
