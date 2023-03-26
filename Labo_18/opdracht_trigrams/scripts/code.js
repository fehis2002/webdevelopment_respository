const setup = () => {
    trigram();
}

const trigram = () => {
    let woord = "onoorbaar";
    for (let i = 0; i < woord.length; i++) {
        let trigram = woord.charAt(i);
        for (let k = i + 1; k < i + 3; k++) {
            trigram += woord.charAt(k);
        }
        if(trigram.length === 3) {
            console.log(trigram)
        }
    }
}
window.addEventListener("load", setup);