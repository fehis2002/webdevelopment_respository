//globale variabelen
const global = {
    AANTAL_HORIZONTAAL: 4,
    AANTAL_VERTICAAL: 3,
    AANTAL_KAARTEN: 6,
    IMAGE_PATH_SUFFIX: '.png',
    IMAGE_PATH_PREFIX: 'images/',
    timoutId: 0,
    afbeeldingen: ['kaart1', 'kaart2', 'kaart3', 'kaart4', 'kaart5', 'kaart6',
        'kaart1', 'kaart2', 'kaart3', 'kaart4', 'kaart5', 'kaart6']
};

const setup = () => {
    generateGameLayout();
    addCards();
}


//genereert de layout van het spel
const generateGameLayout = () => {
    let spelVeld = document.getElementById('spel');
    spelVeld.style.display = 'grid';
    spelVeld.style.gridTemplateColumns = `repeat(${global.AANTAL_HORIZONTAAL}, 1fr`;
    spelVeld.style.gridTemplateRows = `repeat(${global.AANTAL_VERTICAAL}, 1fr`;
    spelVeld.style.rowGap = '10px';
    document.body.style.backgroundColor = '#FFDB58'
}

//Kaart opmaken
const MakeUpCard = (kaart) => {
    kaart.classList.add('kaart');
    kaart.style.backgroundImage = `url("${global.IMAGE_PATH_PREFIX}achterkant${global.IMAGE_PATH_SUFFIX}")`;
    kaart.style.backgroundSize = '100% 100%';
    kaart.style.borderRadius = '15px 15px';
    kaart.style.height = '250px';
    kaart.style.width = '150px';
}

//Voegt kaarten programmatorisch toe aan het pagina
const addCards = () => {
    //kaarten aanmaken
    for(let i = 0; i < global.AANTAL_KAARTEN * 2; i++){
        let kaart = document.createElement('div');
        let afbeelding = document.createElement('img')
        afbeelding.setAttribute('src',
            `${global.IMAGE_PATH_PREFIX}${giveRandomImageName()}${global.IMAGE_PATH_SUFFIX}`)
        afbeelding.style.borderRadius = '15px 15px';
        MakeUpCard(kaart);
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

    //kaart toevoegen naar gekozen class
    if(gekozenKaarten.length < 2) {
        event.currentTarget.classList.add('gekozen');
        event.currentTarget.firstElementChild.style.display = 'block';
        event.currentTarget.backgroundImage = '';
    }

    //controleren of twee kaarten gelijk zijn
    if(gekozenKaarten.length === 2 && cardsAreEqual()) {
        giveCardsBorderColor('green');
        global.timoutId = setTimeout(removeChosenCards, 500);
    } else if(gekozenKaarten.length === 2) {
        giveCardsBorderColor('red')
        global.timoutId = setTimeout(turnChosenCards, 500);
    }
}

//Geeft kaarten een border van een gegeven kleur
const giveCardsBorderColor = (kleur) => {
    for(let kaart of document.getElementsByClassName('gekozen')) {
        kaart.style.border = `${kleur} 3px solid`;
    }
}


//Draait een kaart om
const turnChosenCards = () => {
    let kaarten = document.getElementsByClassName('gekozen');
    //kaarten omdraaien
    for(let kaart of kaarten) {
        kaart.firstElementChild.style.display = 'none';
        kaart.style.border = '';
    }

    //kaarten verwijderen als gekozen
    let lengte = kaarten.length;
    for(let i = 0; i < lengte; i++) {
        kaarten[0].classList.remove('gekozen');
    }
    clearTimeout(global.timeoutId);
}

//Verwijdert kaart als gekozen kaart
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
    clearTimeout(global.timeoutId);
    printGameOver();
}

//Geeft een willekeurige afbeeldingsnaam terug
const giveRandomImageName = () => {
    let afbeeldingNaam = global.afbeeldingen[Math.floor(Math.random() * global.afbeeldingen.length)]
    let afbeeldingNaamIndex = global.afbeeldingen.indexOf(afbeeldingNaam);
    global.afbeeldingen.splice(afbeeldingNaamIndex, 1);
    return afbeeldingNaam;
}

//controleert of alle gekozenkaarten gelijk zijn
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

//Print GAME OVER wanneer spel gedaan is
const printGameOver = () => {
    let kaarten = document.getElementsByClassName('kaart');
    let i = 0;
    let compleetHidden = true;
    while(i < kaarten.length && compleetHidden) {
        if (kaarten[i].style.visibility !=='hidden') {
            compleetHidden = false;
        }
        i++;
    }

    if(compleetHidden) {
        //verwijderen van kaarten
        document.getElementById('spel').textContent = '';
        //aanmaken van nodes
        let tekst = document.createTextNode('GAME OVER');
        let h2 = document.createElement('h2')
        let button = document.createElement('input');
        //eigenschappen toevoegen aan nodes
        button.setAttribute('type', 'button');
        button.setAttribute('value','restart');
        button.addEventListener('click', restartGame)
        h2.appendChild(tekst);
        //opmaak
        document.getElementById('spel').style.display = 'block';
        h2.style.color = '#800000';
        h2.style.display = 'block';
        h2.style.textAlign = 'center';
        button.style.backgroundColor = '#800000';
        button.style.color = '#FFDB58';
        button.style.marginRight = 'auto';
        button.style.marginLeft = 'auto';
        button.style.width = '250px';
        button.style.height = '50px';
        button.style.borderStyle = 'none';
        button.style.borderRadius = '15px';
        button.style.display = 'block';
        //nodes toevoegen aan het pagina
        document.getElementById('spel').appendChild(h2);
        document.getElementById('spel').appendChild(document.createElement('br'))
        document.getElementById('spel').appendChild(button);
    }
}

//Herstart het spel
const restartGame = () => {
    document.getElementById('spel').textContent = '';
    global.afbeeldingen = ['kaart1', 'kaart2', 'kaart3', 'kaart4', 'kaart5', 'kaart6',
        'kaart1', 'kaart2', 'kaart3', 'kaart4', 'kaart5', 'kaart6'];
    generateGameLayout();
    addCards();
}

window.addEventListener("load", setup);