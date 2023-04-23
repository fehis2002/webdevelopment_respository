const setup = () => {

    calculateDays();
}

const calculateDays = () => {

    let verjaardag = new Date('2023-10-31');
    let huidige_datum = new Date();

    let aantalDagen = 0;

    while(huidige_datum.toDateString() !== verjaardag.toDateString()) {
        huidige_datum.setDate(huidige_datum.getDate() + 1)
        aantalDagen += 1;
    }

    console.log(aantalDagen)
}

window.addEventListener("load", setup);