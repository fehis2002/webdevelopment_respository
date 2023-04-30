let personen = [];

// Event listener (btnBewaar click)
// Bewaar de wijzigingen die in de user interface werden aangebracht
const bewaarBewerktePersoon = () => {
    console.log("Klik op de knop bewaar");

    // valideer alle input data en controleer of er geen errors meer zijn
    valideer();

    // indien ok, bewaar de ingegeven data.
        // een nieuw aangemaakte persoon voegen we toe
        // een bestaande persoon in de lijst passen we aan

    //controleren of een persoon gekozen is
    let lstpersonen = document.getElementById('lstPersonen');
    let options = lstpersonen.children
    let i = 0;
    let gekozen = false;
    while (i < options.length && !gekozen) {
        if(options[i].selected) {
            gekozen = true
        } else {
            i++
        }
    }

    // een bestaande persoon in de lijst passen we aan
    if(gekozen) {
        let gekozenPersoon = personen[i];
        gekozenPersoon.voornaam =  document.getElementById('txtVoornaam').value;
        gekozenPersoon.familienaam = document.getElementById('txtFamilienaam').value;
        gekozenPersoon.geboortedatum = new Date(document.getElementById('txtGeboorteDatum').value);
        gekozenPersoon.email = document.getElementById('txtEmail').value;
        gekozenPersoon.aantalKinderen = Number.parseInt(document.getElementById('txtAantalKinderen').value);

        options[i].textContent = `${gekozenPersoon.voornaam} ${gekozenPersoon.familienaam}`;
    } else {

        // een nieuw aangemaakte persoon voegen we toe
        let persoon = {
            voornaam: document.getElementById('txtVoornaam').value,
            familienaam: document.getElementById('txtFamilienaam').value,
            geboortedatum: new Date(document.getElementById('txtGeboorteDatum').value),
            email: document.getElementById('txtEmail').value,
            aantalKinderen: Number.parseInt(document.getElementById('txtAantalKinderen').value)
        }

        personen.push(persoon);


        // zorg ervoor dat de naam en voornaam ook aangepast en/of zichtbaar zijn in de lijst na updaten

        let tekst = document.createTextNode(`${persoon.voornaam} ${persoon.familienaam}`);
        let option = document.createElement('option');
        option.appendChild(tekst);
        option.setAttribute('data-persoon', `${personen.indexOf(persoon)}`);
        document.getElementById('lstPersonen').appendChild(option);
    }
};

// Event listener (btnNieuw click)
const bewerkNieuwePersoon = () => {
    console.log("Klik op de knop nieuw");

    // Zet de user interface klaar om de gegevens van een nieuwe persoon in te voeren
    document.getElementById('txtVoornaam').value = '';
    document.getElementById('txtFamilienaam').value = '';
    document.getElementById('txtGeboorteDatum').value = '';
    document.getElementById('txtEmail').value = '';
    document.getElementById('txtAantalKinderen').value = '';
};

const toonData = (event) => {

    let persoon = personen[Number.parseInt(event.target.getAttribute('data-persoon'))]

    document.getElementById('txtVoornaam').value = persoon.voornaam;
    document.getElementById('txtFamilienaam').value = persoon.familienaam;
    document.getElementById('txtGeboorteDatum').value =
        `${persoon.geboortedatum.getFullYear()}-${persoon.geboortedatum.getMonth() + 1}-${persoon.geboortedatum.getDate()}`;
    document.getElementById('txtEmail').value = persoon.email;
    document.getElementById('txtAantalKinderen').value = persoon.aantalKinderen;
}


// onze setup functie die de event listeners registreert
const setup = () => {
    let btnBewaar = document.getElementById("btnBewaar");
    btnBewaar.addEventListener("click", bewaarBewerktePersoon);

    let btnNieuw = document.getElementById("btnNieuw");
    btnNieuw.addEventListener("click", bewerkNieuwePersoon);

    let lstPersonen = document.getElementById("lstPersonen");
    // voeg een change listener toe aan lstPersonen. Bij het klikken op een option element in de lijst
    // moet de data van die persoon getoond worden in het formulier
    lstPersonen.addEventListener('change', toonData);
};

window.addEventListener("load", setup);