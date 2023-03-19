const setup = () => {
    toonPrompt()
}

const toonPrompt = () => {

    let input = "";
    let keuzelijst = document.getElementById("gemeenten");
    let opties = []
    while (input !== "stop") {
        input = window.prompt("Gemeente:", "stop");
        if (input !== "stop") {
            opties.push(input)
        }
    }
    opties.sort()
    for(let optie of opties) {
        keuzelijst.innerHTML += `<option>${optie}</option>`;
    }
}

window.addEventListener("load", setup);