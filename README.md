# Project Young Potentials

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.24.

## Omschrijving project

Young Potentials is een website van de hogeschool Vives. Op deze website kunnen bedrijven vacatures uploaden, hiervoor moeten ze zich wel eerst registreren. Studenten kunnen gebruik maken van deze website om vacatures te raadplegen en kunnen vacatures in hun favorietenlijst plaatsen. Ook is het mogelijk om te solliciteren voor een bepaalde vacature.

## Functionaliteiten
### Niet geregistreerde gebruiker
- Registeren
- Vacatures raadplegen
- Vacatures filteren
- Vacatures sorteren op datum
- Contact formulier om de beheerder te contacteren
- Cookies kunnen accepteren/negeren
- De website vertalen naar een andere taal (Engels, kan makkelijk uitgebreid worden naar meer talen)

### Student/werkzoekend
- Registeren
- Inloggen/Uitloggen
- profiel raadplegen/wijzigen
- CV kunnen uploaden (in pdf formaat)
- Vacatures raadplegen
- Vacatures filteren (op types (vacatures, stages, vakantiejobs, vrijwilligerswerk) en op studiegebied (HWB, IWT, SAW, ...))
- Vacatures sorteren op datum
- Vacatures als favoriet markeren
- Solliciteren
- Wachtwoord vergeten
- Contact formulier om de beheerder te contacteren
- Cookies kunnen accepteren/negeren
- De website vertalen naar een andere taal (Engels, kan makkelijk uitgebreid worden naar meer talen)

### Bedrijf
- Registeren
- Inloggen/Uitloggen
- profiel raadplegen/wijzigen
- Vacatures uploaden/verwijderen
- Een bijlage toevoegen aan een vacature
- Wachtwoord vergeten
- Contact formulier om de beheerder te contacteren
- Cookies kunnen accepteren/negeren
- De website vertalen naar een andere taal (Engels, kan makkelijk uitgebreid worden naar meer talen)

### Beheerder (Admin)
- Registeren
- Inloggen/Uitloggen
- Bedrijven verifiëren/verwijderen
- Wachtwoord vergeten
- Cookies kunnen accepteren/negeren
- De website vertalen naar een andere taal (Engels, kan makkelijk uitgebreid worden naar meer talen)

### Overzicht alle componenten zie DMSF
Op projectwerk.vives.be bij het tabblad DMSF is er een overzicht geupload van de componenten

## Tekortkomingen programma (bugs)
### Paging/sorting
Wanneer er van pagina verandert wordt bij de vacaturelijst en hierna wordt er gesorteerd, dan blijft hij op dezelfde pagina. Er moet nog worden voorzien dat hij terugkeert naar de eerste pagina alvorens te sorteren. Hiervoor is er code voorzien, maar de code is niet optimaal want als er gefilterd wordt dan kan er niet meer gesorteerd worden.

### Filter component sticky
Het filter component is voorzien van het sticky attribute zodat de gebruiker makkelijk kan filteren. Het probleem hierbij is dat het filter component hiervoor en fixed height voor nodig heeft, dit staat momenteel op 2500px. Er werd reeds een aanzet gedaan om de height dynamisch in te laden afhankelijk van de height van het vacature component. Maar dit werkt nog niet optimaal.

### Filter component localStorage
Het filter component wordt momenteel opgeslaan in de LocalStorage, maar hier wordt geen timestamp meegegeven waardoor deze nooit wordt upgedate. Mogelijke oplossing: TimeStamp meegeven in LocalStorage en indien de LocalStorage X aantal tijd bestaat wordt deze opnieuw upgedate aan de hand van de gegevens uit de database.

### Toevoegen vacature (link met studiegebied)
Bij het toevoegen van een vacature moet er een link worden gemaakt met de studiegebieden en opleidignen zodat er kan gefilterd worden. 
Maar wanneer de frontend lokaal staat en de backend op azure dan werd deze link telkens verwijderd na het toevoegen van een nieuwe vacature. (Soms werkte dit wel)
Als we dit testen met de backend lokaal of via postman, dan is er nooit een probleem en werkt het zoals het zou moeten werken. Op DSMSF staan er video's die dit fenomeen illustreren.

### Solliciteren zonder CV
In stap 3 bij de sollicitatie popup kan de stap worden overgeslaan zonder dat er een CV wordt upgeload.

## Extra informatie Angular project
### Development server

Run `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
