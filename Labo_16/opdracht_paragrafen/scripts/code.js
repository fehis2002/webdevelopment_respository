const setup = () => {
    let belangrijk = document.getElementsByClassName('belangrijk');
    for(let element of belangrijk) {
        element.classList.add('opvallend');
    }
}

window.addEventListener("load", setup);