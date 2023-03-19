const setup = () => {
    vervangDeMetHet()
}

const vervangDeMetHet = () => {
    let tekst = "Gisteren zat de jongen op de stoep en at de helft van de appel";

    let woorden = tekst.split(' ');
    for(let i = 0; i < woorden.length; i++) {
        if(woorden[i].toLowerCase() === 'de') {
            woorden[i] = 'het';
        } else if (woorden[i].toLowerCase() === 'De') {
            woorden[i] = 'Het';
        }
    }

    console.log(woorden.join(' '));
}
window.addEventListener("load", setup);