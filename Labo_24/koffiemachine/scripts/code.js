global = {
    KOFFIES: {
        'Espresso': 1.40,
        'Doppio': 1.80,
        'Ristretto': 2.20,
        'Americano': 1.00,
        'Lungo': 1.50,
        'Cappuccino': 1.90,
        'Latte': 1.90,
        'Macchiato': 3.00
    }
}

const setup = () => {

    let knop = document.getElementById('knop');
    knop.addEventListener('click', () => {
        document.getElementById('kasticket').innerHTML = '';
        genereerKasTicket();
    });
}

const genereerKasTicket = () => {

    let totaleKostprijs = 0;

    //header van de kasticket op pagina laten weergeven
    printHeaderKasTicket();

    //Gekozen koffies afrukken in kasticket
    let koffies = document.querySelectorAll('input[name="koffie"]');
    for(let koffie of koffies) {
        if(koffie.checked) {
            let prijs = global.KOFFIES[koffie.value]
            document.getElementById('kasticket')
                .appendChild(document.createElement('p')
                    .appendChild(document.createTextNode(`${koffie.value}: €${prijs.toFixed(2)}`)));
            document.getElementById('kasticket').appendChild(document.createElement('br'));
            totaleKostprijs += prijs;
        }
    }

    //Totaal afdrukken van kasticket
    printEndOfKasticket(totaleKostprijs);
}

const printHeaderKasTicket = () => {


    //div opvragen
    let kasticket = document.getElementById('kasticket');

    //elementen en textnode opmaken
    let titelText = document.createTextNode(`Kasticket van ${new Date().toLocaleTimeString()}`);
    let lijnText = document.createTextNode('------------------------------');
    let titel = document.createElement('h3');
    let lijn = document.createElement('h3');
    let br = document.createElement('br');

    //elementen en textnode appenden
    titel.appendChild(titelText);
    lijn.appendChild(lijnText)
    kasticket.appendChild(titel);
    kasticket.appendChild(br);
    kasticket.appendChild(lijn);
}

const printEndOfKasticket = bedrag => {

    //div opvragen
    let kasticket = document.getElementById('kasticket');

    //elementen en textnode opmaken
    let lijnText = document.createTextNode('------------------------------');
    let lijn = document.createElement('h3');
    let br = document.createElement('br');
    let totaalText = document.createTextNode(`Totaal is €${bedrag.toFixed(2)}`);
    let totaal = document.createElement('h3');

    //elementen en textnode appenden
    lijn.appendChild(lijnText);
    totaal.appendChild(totaalText);
    kasticket.appendChild(lijn);
    kasticket.appendChild(br);
    kasticket.appendChild(totaal);
}

window.addEventListener("load", setup);