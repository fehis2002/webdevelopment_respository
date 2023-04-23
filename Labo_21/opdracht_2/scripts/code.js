const setup = () => {

    let student1 = {
        voornaam: "Fabian",
        familienaam: "Ehis",
        geboorteDatum: new Date("2002-10-31"),
        adres: {
            adres: "Oude zak 15",
            postcode: "8800",
            gemeente: "Roeselare"
        },

        isIngeschreven: true,
        namenVanExen: [],
        aantalAutos: 1
    }

    let jsonString = JSON.stringify(student1);

    console.log(jsonString);
}

window.addEventListener("load", setup);