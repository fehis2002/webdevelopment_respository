const setup = () => {
    let paragrafen = document.querySelectorAll('p');
    let lengte = paragrafen.length
    for(let i = 0; i < lengte; i++){
        let parent = paragrafen[i].parentNode;
        let p = document.createTextNode('Good Job!');
        parent.removeChild(paragrafen[i]);
        parent.append(p);
    }
}

window.addEventListener("load", setup);