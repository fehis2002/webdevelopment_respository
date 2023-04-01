//globale variabelen
const global = {
    AANTAL_HORIZONTAAL: 4,
    AANTAL_VERTICAAL: 3,
    AANTAL_KAARTEN: 6,
    IMAGE_PATH_SUFFIX: '.png',
    IMAGE_PATH_PREFIX: 'images/',
    timoutId: 0,
    afbeeldingen: ['kaart1', 'kaart2', 'kaart3', 'kaart4', 'kaart5', 'kaart6',
        'kaart1', 'kaart2', 'kaart3', 'kaart4', 'kaart5', 'kaart6',
        'kaart1', 'kaart2', 'kaart3', 'kaart4', 'kaart5', 'kaart6'],
    AANTAL_JUISTE_KAARTEN: 3
};

const setup = () => {
    generateGameLayout();
    addCards();
}

const generateGameLayout = () => {
    let spelVeld = document.getElementById('spel');
    spelVeld.style.display = 'grid';
    spelVeld.style.gridTemplateColumns = `repeat(${global.AANTAL_HORIZONTAAL}, 1fr)`;
    spelVeld.style.gridTemplateRows = `repeat(${global.AANTAL_VERTICAAL}, 1fr)`;
    spelVeld.style.rowGap = '10px';
}

//Voegt kaarten programmatorisch toe aan het pagina
const addCards = () => {
    //kaarten aanmaken
    for(let i = 0; i < global.AANTAL_KAARTEN * global.AANTAL_JUISTE_KAARTEN; i++){
        let kaart = document.createElement('div');
        let afbeelding = document.createElement('img')
        afbeelding.setAttribute('src',
            `${global.IMAGE_PATH_PREFIX}${giveRandomImageName()}${global.IMAGE_PATH_SUFFIX}`)
        kaart.classList.add('kaart');
        kaart.style.backgroundImage = `url("${global.IMAGE_PATH_PREFIX}achterkant${global.IMAGE_PATH_SUFFIX}")`;
        kaart.style.backgroundSize = '100% 100%';
        kaart.style.height = '250px';
        kaart.style.width = '150px';
        kaart.appendChild(afbeelding);
        kaart.addEventListener('click', chooseCard);
        document.querySelector('body > div#spel').appendChild(kaart);
    }

    //afbeeldingzijde van de kaart omdraaien
    for(let afbeelding of document.querySelectorAll('.kaart > img')) {
        afbeelding.style.height = '250px';
        afbeelding.style.width = '150px';
        afbeelding.style.display = 'none';
    }
}


const chooseCard = (event) => {

    let gekozenKaarten = document.getElementsByClassName('gekozen');

    //audio afspelen
    let audio = new Audio('audios/card_flip.mp3');
    audio.play();

    //kaart toevoegen naar gekozen class
    if(gekozenKaarten.length < global.AANTAL_JUISTE_KAARTEN) {
        event.currentTarget.classList.add('gekozen');
        event.currentTarget.style.transition = 'transform 0.3s';
        event.currentTarget.backgroundImage = '';
        event.currentTarget.style.transform = 'rotateY(180deg)';
        event.currentTarget.firstElementChild.style.display = 'block';
    }

    //controleren of kaarten gelijk zijn
    if(gekozenKaarten.length === global.AANTAL_JUISTE_KAARTEN && cardsAreEqual()) {
        giveCardsBorderColor('green');
        global.timoutId = setTimeout(removeChosenCards, 500);
    } else if(gekozenKaarten.length === global.AANTAL_JUISTE_KAARTEN) {
        giveCardsBorderColor('red')
        global.timoutId = setTimeout(turnChosenCards, 500);
    }
}

const cardsAreEqual = () => {
    let gekozenKaarten = document.getElementsByClassName('gekozen');
    let afbeeldingNaam = gekozenKaarten[0].firstElementChild.getAttribute('src');
    let gelijk = true;
    let i = 0;
    while(i < gekozenKaarten.length && gelijk) {
        if(gekozenKaarten[i].firstElementChild.getAttribute('src') !== afbeeldingNaam) {
            gelijk = false;
        }
        i++;
    }

    return gelijk;
}

//Geeft kaarten een border van een gegeven kleur
const giveCardsBorderColor = (kleur) => {
    for(let kaart of document.getElementsByClassName('gekozen')) {
        kaart.style.border = `${kleur} 3px solid`;
    }
}



const turnChosenCards = () => {
    let kaarten = document.getElementsByClassName('gekozen');
    //kaarten omdraaien
    for(let kaart of kaarten) {
        kaart.firstElementChild.style.display = 'none';
        kaart.style.transition = '';
        kaart.style.transform = '';
        kaart.style.border = '';
    }

    //kaarten verwijderen als gekozen
    let lengte = kaarten.length;
    for(let i = 0; i < lengte; i++) {
        kaarten[0].classList.remove('gekozen');
    }
    clearTimeout(global.timeoutId);
}

const removeChosenCards = () => {
    let kaarten = document.getElementsByClassName('gekozen');

    for(let kaart of kaarten) {
        kaart.style.border = '';
    }

    //kaarten verwijderen als gekozen en verbergen
    let lengte = kaarten.length;
    for(let i = 0; i < lengte; i++) {
        kaarten[0].style.visibility = 'hidden';
        kaarten[0].classList.remove('gekozen');
    }
}

const giveRandomImageName = () => {
    let afbeeldingNaam = global.afbeeldingen[Math.floor(Math.random() * global.afbeeldingen.length)]
    let afbeeldingNaamIndex = global.afbeeldingen.indexOf(afbeeldingNaam);
    global.afbeeldingen.splice(afbeeldingNaamIndex, 1);
    return afbeeldingNaam;
}

window.addEventListener("load", setup);