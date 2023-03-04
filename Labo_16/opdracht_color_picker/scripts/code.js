const setup = () => {
    let sliders = document.getElementsByClassName('slider');
    for(let slider of sliders) {
        slider.addEventListener('change', update)
        slider.addEventListener('input', update)
    }
}

const update = () => {
    let sliders = document.getElementsByClassName('slider');
    let square = document.getElementById('square');
    let color = document.getElementsByClassName('colorValue');
    let rgb = ['Red', 'Green' , 'Blue']
    for(let i = 0; i < sliders.length; i++) {
        color[i].innerHTML = rgb[i] + ' ' + sliders[i].value
    }
    square.style.backgroundColor = `rgb(${sliders[0].value}, ${sliders[1].value}, ${sliders[2].value}`;
}

window.addEventListener("load", setup);