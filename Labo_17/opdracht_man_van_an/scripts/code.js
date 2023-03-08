const setup = () => {
    let button = document.getElementById('button');
    button.addEventListener('click', aantalKeerAn);
}

const aantalKeerAn = () => {
    let tekst = document.getElementById('input').value;
    let aantal = 0;
    for(let i = 0; i < tekst.length; i++){
        if(tekst.charAt(i) === 'a' && tekst.charAt(i + 1) === 'n') {
            aantal++;
        }
    }
    document.getElementById('aantal').innerHTML =`Aantal keer is ${aantal}`;
}

window.addEventListener("load", setup);