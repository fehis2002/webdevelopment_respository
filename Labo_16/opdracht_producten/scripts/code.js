const setup = () => {
    let button = document.getElementById('button');
    button.addEventListener('click', calculate);
}

const calculate = () => {
    let prijzen = document.getElementsByClassName('prijs');
    let aantallen = document.getElementsByClassName('aantal');
    let btwList = document.getElementsByClassName('btw');
    let subtotalen = document.getElementsByClassName('subtotaal');
    let totaal = document.getElementById('totaal');
    let som = 0;

    //subtotalen berekenen
    for(let i = 0; i < prijzen.length; i++){
        let bedrag = parseFloat(prijzen[i].textContent) * parseFloat(aantallen[i].value);
        let btw = parseInt(btwList[i].textContent);
        subtotalen[i].innerHTML =
            `${((bedrag * btw / 100) + bedrag).toFixed(2)} Eur`;
    }

    //totaal berekenen
    for(let subtotaal of subtotalen) {
        som += parseFloat(subtotaal.textContent);
    }

    totaal.innerHTML = `${som.toFixed(2)} Eur`;
}

window.addEventListener("load", setup);