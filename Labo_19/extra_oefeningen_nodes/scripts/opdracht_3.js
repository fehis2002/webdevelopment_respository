const setup = () => {
    let div = document.querySelector('#myDIV');
    let p = document.createElement('p');
    let tekst = document.createTextNode('Dit is een tekst');
    p.appendChild(tekst);
    div.appendChild(p)
}

window.addEventListener("load", setup);