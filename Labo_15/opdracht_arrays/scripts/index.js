let familieleden = ['John', 'Michael', 'Daquan', 'Tom', 'Jerry'];
console.log(familieleden[0]);
console.log(familieleden[2]);
console.log(familieleden[4]);

const voegNaamToe = (naam) => {
    familieleden.push(naam)
    console.log(familieleden);
}

voegNaamToe("Fabian");

console.log(familieleden.join(" "))

const setup = () => {
}
window.addEventListener("load", setup);