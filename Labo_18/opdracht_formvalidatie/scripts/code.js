const setup = () => {
    let knop = document.getElementById("knop");
    knop.addEventListener("click", checkForm)
}

const checkFirstName = () => {
    let voornaam = document.getElementById("voornaam");
    if (voornaam.value.length > 30) {
        generateError(voornaam, "max. 30 karakters", 0)
    } else {
        turnErrorOf(voornaam, 0);
    }
}

const checkLastName = () =>{
    let familienaam = document.getElementById("familienaam");
    if (familienaam.value.length === 0) {
        generateError(familienaam, "verplicht veld", 1);
    } else if (familienaam.value.length > 50) {
        generateError(familienaam, "max. 50 karakters", 1);
    } else {
        turnErrorOf(familienaam, 1);
    }
}

const checkBirthdate = () =>{
    let geboortedatum = document.getElementById("geboortedatum");
    let jaar = geboortedatum.value.slice(0, 4);
    let maand = geboortedatum.value.slice(5, 7);
    let dag = geboortedatum.value.slice(-2);
    if (geboortedatum.value.length === 0) {
        generateError(geboortedatum, "verplicht veld", 2);
    } else if (geboortedatum.value.charAt(4) !== "-" || geboortedatum.value.charAt(7) !== "-" || jaar.length !== 4
        || Number.parseInt(jaar) < 0 || maand.length !== 2 || Number.parseInt(maand) < 0
        || dag.length !== 2 || Number.parseInt(jaar) < 0) {
        generateError(geboortedatum, "formaat is niet jjjj-mm-dd", 2);
    } else {
        turnErrorOf(geboortedatum, 2);
    }
}

const checkEmail = () => {
    let email = document.getElementById("email");
    if (email.value.length === 0) {
        generateError(email, "verplicht veld", 3);
    } else if (countCharInString(email.value, "@") !== 1 || email.value.split("@")[0].length < 1
        || email.value.split("@")[1].length < 1) {
        generateError(email, "geen geldig email adres", 3);
    } else {
        turnErrorOf(email, 3);
    }
}

const checkAmountOfChildren = () => {
    let aantalKinderen = document.getElementById("aantalKinderen");
    if (!isGetal(aantalKinderen.value) || Number.parseInt(aantalKinderen.value) < 0) {
        generateError(aantalKinderen, "is geen positief getal", 4)
    } else if (Number.parseInt(aantalKinderen.value) > 99) {
        generateError(aantalKinderen, "is te vruchtbaar", 4);
    } else {
        turnErrorOf(aantalKinderen, 4);
    }
}

const checkForm= () => {
    //voornaam
    checkFirstName();

    //familienaam
    checkLastName();

    //geboortedatum
    checkBirthdate();

    //email
    checkEmail();

    //aantal kinderen
    checkAmountOfChildren();
}

const generateError = (node, tekst, index) => {
    let error = document.getElementsByClassName("error")[index];
    error.innerHTML = `${tekst}`;
    node.style.border = "1px red solid";
}

const turnErrorOf = (node, index) => {
    let error = document.getElementsByClassName("error")[index];
    error.innerHTML = "";
    node.style.border = "";
}

const countCharInString  = (string, char) => {
    let count = 0;
    for(let character of string) {
        if(character === char) {
            count++;
        }
    }
    return count;
}

const isGetal = (tekst) => {
    return !isNaN(tekst);
}

window.addEventListener("load", setup);