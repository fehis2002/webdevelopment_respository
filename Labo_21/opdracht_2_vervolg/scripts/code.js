const setup = () => {

    let studentJSON = JSON.parse("{\"voornaam\":\"Fabian\",\"familienaam\":\"Ehis\",\"geboorteDatum\":\"2002-10-31T00:00:00.000Z\",\"adres\":{\"adres\":\"Oude zak 15\",\"postcode\":\"8800\",\"gemeente\":\"Roeselare\"},\"isIngeschreven\":true,\"namenVanExen\":[],\"aantalAutos\":1}");

    console.log(studentJSON.voornaam);
}

window.addEventListener("load", setup);