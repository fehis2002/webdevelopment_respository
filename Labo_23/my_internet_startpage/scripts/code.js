//globale variabele
const global = {
    searches: [],
    COMMAND_PREFIXES: ['/g', '/y', '/t', '/i'],
    URLS: [
        'https://www.google.com/search?q=',
        'https://www.youtube.com/results?search_query=',
        'https://twitter.com/hashtag/',
        'https://www.instagram.com/explore/tags/'
    ],
    COLORS: {
        'Google': {
            'card': '#4285f4',
            'button': '#ea4335',
            'text': '#fbbc05'
        },
        'Youtube': {
            'card': '#ff0000',
            'button': '#282828',
            'text': '#ffffff'
        },
        'Twitter': {
            'card': '#1da1f2',
            'button': '#14171a',
            'text': '#f5f8fa'
        },
        'Instagram': {
            'card': '#c32aa3',
            'button': '#f46f30',
            'text': '#ffdc7d'

        }
    }
}

const setup = () => {

    let knop = document.getElementById('input_knop');
    knop.addEventListener('click', () => {
        let input = document.getElementById('text_field').value
        processCommand(input);
    });

    let input_field = document.getElementById('text_field');
    input_field.addEventListener('keypress', event => {
        if(event.key === 'Enter') {
            let input = document.getElementById('text_field').value
            processCommand(input);
        }
    })

    if(JSON.parse(localStorage.getItem('searches')).length > 0){
        reload();
    }
}

//verwerkt commando
const processCommand = command => {

    let titles = ['Google', 'Youtube', 'Twitter', 'Instagram'];
    let commandParts = command.split(' ');
    let prefix = commandParts[0];

    if (global.COMMAND_PREFIXES.includes(prefix)) {
        // zoekopdracht opslaan in een object
        let searchObject = {
            title: titles[global.COMMAND_PREFIXES.indexOf(prefix)],
            text: `${commandParts.slice(1, commandParts.length).join(' ')}`,
            url: `${global.URLS[global.COMMAND_PREFIXES.indexOf(prefix)]}${convertToURL(titles[global.COMMAND_PREFIXES.indexOf(prefix)], commandParts.slice(1, commandParts.length))}`
        }
        //zoekopdracht uitvoeren
        window.location.href = `${searchObject.url}`;
        //voeg object toe aan array
        global.searches.push(JSON.stringify(searchObject));
        localStorage.setItem('searches', `${JSON.stringify(global.searches)}`);

        setCardOnPage(searchObject);
    } else {
        //Geef foutmelding terug
        window.alert('Unkown command prefix');
    }
}

//Converteert een string naar een gepaste query a.d.h.v. de title
const convertToURL = (title, searchString) => {

    if(title === 'Twitter' || title === 'Instagram'){
        return searchString.join('');
    } else {
        return searchString.join('+');
    }
}

//Deze functie bouwt een kaart
const buildCard = searchObject => {
    // opmaken van divs
    let column = document.createElement('div');
    let card = document.createElement('div');
    let cardBody = document.createElement('div');

    //opmaken van inhoud
    let title = document.createElement('h5');
    let description = document.createElement('p');
    let button = document.createElement('a');

    //opmaken van textNodes
    let titleText = document.createTextNode(`${searchObject.title}`);
    let descriptionText = document.createTextNode(`${searchObject.text}`);
    let buttonText = document.createTextNode('Go!');

    //opmaken van de attributen en klassen
    column.classList.add('col-4');
    card.classList.add('card');
    cardBody.classList.add('card-body');
    title.classList.add('card-title');
    description.classList.add('card-text');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.setAttribute('href', `${searchObject.url}`);

    //appenden van nodes
    column.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(button);
    title.appendChild(titleText);
    description.appendChild(descriptionText);
    button.appendChild(buttonText);

    //style toepassen
    card.style.backgroundColor = `${global.COLORS[searchObject.title]['card']}`;
    card.style.color = 'white';
    button.style.backgroundColor = `${global.COLORS[searchObject.title]['button']}`;
    button.style.color = `${global.COLORS[searchObject.title]['text']}`;
    button.style.fontWeight = 'bold';

    return column;
}

//Deze functie retourneert de index van de vrije rij retourneert -1 als alle rijen vol zijn
const checkIfRowIsFull = () => {
    let rows = document.querySelectorAll('#history > .container > .row');
    let free = false;
    let i = 0;
    while (i < rows.length && !free){
        if (rows.length < 3) {
            free = true;
        } else {
            i++
        }
    }

    if (free) {
        return i;
    } else {
        return -1;
    }
}

// Functie wordt gebruikt bij het herladen van de pagina
const reload = () => {
    global.searches = JSON.parse(localStorage.getItem('searches'));
        for (let search of global.searches) {
            let searchObject = JSON.parse(search);
            setCardOnPage(searchObject);
        }
}

// Deze functie zet een kaart op de webpagina
const setCardOnPage = searchObject => {
    let card = buildCard(searchObject);
    let index = checkIfRowIsFull();
    if(index === -1) {
        let row = document.createElement('div');
        row.classList.add('row');
        row.appendChild(card);
        document.querySelector('#history .container').appendChild(row);
    } else {
        document.querySelectorAll('#history > .container > .row')[index].appendChild(card);
    }
}

window.addEventListener("load", setup);