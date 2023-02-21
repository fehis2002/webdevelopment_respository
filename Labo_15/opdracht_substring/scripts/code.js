const setup = () => {
    let txtInput = document.getElementById('txtInput');
    let start = document.getElementById('start');
    let end = document.getElementById('end');
    let txtOutput = document.getElementById('txtOutput');
    let button = document.getElementById('button');

    button.addEventListener('click', () => {
        console.log(start);
        console.log(end);
        txtOutput.innerHTML = txtInput.value.substring(start.value, end.value);
    })
}

window.addEventListener("load", setup);