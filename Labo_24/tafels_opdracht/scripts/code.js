global = {
    TAFELS: []
}

const setup = () => {
    let input = document.getElementById('input');
    let knop = document.getElementById('knop');

    knop.addEventListener('click', () => {
        if(Number.parseInt(input.value)) {
            maakTafel(Number.parseInt(input.value));
            input.value = '';
        } else {
            window.alert('Dit is geen getal');
        }
    });

    if(JSON.parse(localStorage.getItem('tafels')).length > 0) {
        herladen();
    }
}


const maakTafel = getal => {

    //aanmaken van basis
    const tafel = document.createElement('div');
    const titelText = document.createTextNode(
        `Tafel van ${getal} aangemaakt op: ${new Date().toLocaleTimeString()}`
    );
    const titel = document.createElement('p');

    //style
    titel.style.display = 'block';
    titel.style.color = 'white';
    titel.style.backgroundColor = 'darkBlue';
    titel.style.margin = '0px';
    titel.style.fontSize = '15px';
    titel.style.padding = '5px';
    tafel.style.display = 'inline-block';
    tafel.style.width = '300px';
    tafel.style.border = '1px solid darkBlue';
    tafel.style.margin = '10px';

    //appenden van elementen
    titel.appendChild(titelText);
    tafel.appendChild(titel);


    for(let i = 1; i <= 10; i++) {
        let berekeningText = document.createTextNode(`${getal} x ${i} = ${getal * i}`);
        let berekening = document.createElement('p');
        berekening.style.display = 'block';
        berekening.style.margin = '0px';
        berekening.style.padding = '10px 5px';
        berekening.classList.add('berekening');
        if(i % 2 === 0) {
            berekening.style.backgroundColor = 'lightGrey';
        } else {
            berekening.style.backgroundColor = 'white';
        }
        berekening.appendChild(berekeningText);
        tafel.appendChild(berekening);
    }

    //toevoegen aan lijst tafels
    global.TAFELS.push(getal);

    //localStorage updaten
    localStorage.setItem('tafels', JSON.stringify(global.TAFELS));

    //Tafel op pagina laten weergeven
    document.getElementById('tafels').appendChild(tafel);

}


const herladen = () => {
    for(let tafel of JSON.parse(localStorage.getItem('tafels'))) {
        maakTafel(tafel)
    }
}



window.addEventListener("load", setup);