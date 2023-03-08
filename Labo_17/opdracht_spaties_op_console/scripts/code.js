const setup = () => {
    let button = document.getElementById('button');
    button.addEventListener('click', spaceTekst);
    spaceTekst();
}

const spaceTekst = () => {
    let tekst = document.getElementById('input').value;
    let resultaat = "";
    for(let letter of tekst) {
        resultaat += `${letter} `;
    }
    console.log(resultaat)
}

window.addEventListener("load", setup);