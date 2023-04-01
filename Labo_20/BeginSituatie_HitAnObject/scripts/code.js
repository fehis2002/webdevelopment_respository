let global = {
    IMAGE_COUNT: 5,  // aantal figuren
    IMAGE_SIZE: 48, // grootte van de figuur
    IMAGE_PATH_PREFIX: "images/",  // map van de figuren
    IMAGE_PATH_SUFFIX: ".png",  // extensie van de figuren
    MOVE_DELAY: 3000, // aantal milliseconden voor een nieuwe afbeelding verschijnt
    score: 0,    // aantal hits
    timeoutId: 0 // id van de timeout timer, zodat we die kunnen annuleren
};

const setup = () => {
    let image = document.getElementById('target');
    let button = document.getElementById('startButton');
    button.addEventListener('click', start);
    image.addEventListener('click', play);
}

//Toont melding dat het spel gedaan is
const endGame = () => {
    window.alert('GAME OVER');
}

//Deze functie verplaatst de afbeelding
const moveImage = () => {
    let image = document.getElementById('target');
    let playfield = document.getElementById('playField');
    let maxLeft = playfield.clientWidth - image.offsetWidth;
    let maxHeight = playfield.clientHeight - image.offsetHeight;

    //verplaatst de afbeelding
    let left=Math.floor(Math.random()*maxLeft);
    let top=Math.floor(Math.random()*maxHeight);
    image.style.left=left+"px";
    image.style.top=top+"px";
}

//Verandert de afbeelding
const changeImage = () => {
    let image = document.getElementById('target');
    let path = `${global.IMAGE_PATH_PREFIX}${Math.floor(Math.random() * global.IMAGE_COUNT)}${global.IMAGE_PATH_SUFFIX}`;
    image.setAttribute('src', path);
    if(path === 'images/0.png') {
        global.timeoutId = setInterval(changeImage, global.MOVE_DELAY);
    }
}


const play = () => {
    clearTimeout(global.timeoutId);
    let image = document.getElementById('target');
    if(image.getAttribute('src') === 'images/0.png') {
        endGame();
        resetGame();
    } else {
        moveImage();
        changeImage();
        increaseScore();
    }
}

const start = () => {
    let button = document.getElementById('startButton');
    button.style.display = 'none';
    changeImage()
    moveImage()
}

//Reset het spel
const resetGame = () => {
    let button = document.getElementById('startButton');
    let image = document.getElementById('target');
    let p = document.getElementsByTagName('p')[0];
    button.style.display = 'inline-block';
    p.textContent = 'Aantal hits: 0';
    image.style.left = '145px';
    image.style.top = '7px';
}

//Verhoogt de score
const increaseScore = () => {
    let p = document.getElementsByTagName('p')[0];
    global.score++;
    p.textContent = `Aantal hits: ${global.score}`;

}

window.addEventListener('load', setup)