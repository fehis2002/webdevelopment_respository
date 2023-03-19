const setup = () => {
    let knop = document.getElementById("knop");
    knop.addEventListener("click", toonFormWaarden);
}

const toonFormWaarden = () => {

   let roker = "";
   if(document.getElementById("roker").checked){
       roker = "is roker";
   } else {
       roker = "is geen roker";
   }
   // moedertaal verkrijgen
    let taal = "";
    let moedertalen = document.getElementsByName("moedertaal");
    for(let moedertaal of moedertalen){
        if(moedertaal.checked) {
            taal = moedertaal.value;
        }
    }
    //favoriete buurland verkrijgen
    let buurland = "";
    let buurlandKeuzelijst = document.getElementById("buurland");
    for(let buurlandOptie of buurlandKeuzelijst.options) {
        if(buurlandOptie.selected) {
            buurland = `${buurlandOptie.text}`
        }
    }
    //bestellingen verkrijgen
    let bestellingen = "";
    let bestellingKeuzelijst = document.getElementById("bestelling")
    for(let bestelling of bestellingKeuzelijst) {
        if(bestelling.selected) {
            bestellingen += `${bestelling.value} `;
        }
    }

    console.log(`${roker}\nmoedertaal is ${taal}\nfavoriete buurland is ${buurland}\nbestelling bestaat uit ${bestellingen}`)
}

window.addEventListener("load", setup);