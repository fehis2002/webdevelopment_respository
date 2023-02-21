const setup = () => {
    let pElement = document.getElementById('txtOutput');
    let button = document.getElementById("wijzig");
    button.addEventListener("click", () => {
        if(pElement.innerHTML === 'Welkom!') {
           pElement.innerHTML = "Hello World!"
        } else {
            pElement.innerHTML = "Welkom!";
        }
    })
}

window.addEventListener("load", setup);