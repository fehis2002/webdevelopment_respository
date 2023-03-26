const setup = () => {
    let sliders = document.getElementsByClassName('slider');
    update();
    for(let slider of sliders) {
        slider.addEventListener('change', update)
        slider.addEventListener('input', update)
    }

    let knop = document.getElementById('knop');
    knop.addEventListener('click', save);
}

const update = () => {
    let sliders = document.getElementsByClassName('slider');
    let square = document.getElementById('square');
    let color = document.getElementsByClassName('colorValue');
    let rgb = ['Red', 'Green' , 'Blue']
    for(let i = 0; i < sliders.length; i++) {
        color[i].innerHTML = rgb[i] + ' ' + sliders[i].value
    }
    square.style.backgroundColor = getColorFromSliders();
}

const getColorFromSliders = () => {
    let sliders = document.getElementsByClassName('slider');
    return `rgb(${sliders[0].value}, ${sliders[1].value}, ${sliders[2].value}`
}

const save = () => {
    if(document.querySelector('body > div').children.length < 2) {
        // divs maken
        let div = document.createElement('div');
        let rectangle = document.createElement('div');

        //een knop maken
        let knop = document.createElement('input');

        //attributen en klassen toevoegen
        setAttributesAndClasses(rectangle, div, knop);

        //toevoegen van nodes
        addNodes(rectangle, div, knop);

        //styles toevoegen
        addStylesToSaveButton(rectangle, div, knop)

        //kleur veranderen van rechthoek
        rectangle.addEventListener('click', (event) => {
            event.currentTarget.style.backgroundColor = getColorFromSliders();
        });

        //listener toevoegen bij de delete knop
        knop.addEventListener('click', () => {
            document.querySelector('body > div').removeChild(div);
        })
    }
}

const addStylesToSaveButton = (rectangle, div, knop) => {
    rectangle.style.border = '2px solid black';
    rectangle.style.position = 'relative';
    rectangle.style.backgroundColor = getColorFromSliders();
    rectangle.style.top = '25px';
    rectangle.style.width = '50px';
    rectangle.style.height = '100px';
    rectangle.style.left = '50px';
    div.style.border = '5px solid grey';
    div.style.borderRadius = '10px';
    div.style.width = '150px';
    div.style.marginTop = '50px';
    div.style.height = '150px';
    knop.style.position = 'relative'
    knop.style.float = 'right';
}

const setAttributesAndClasses = (rectangle, div, knop) => {
    div.setAttribute('id', 'colorPickerRectangle');
    rectangle.setAttribute('id', 'rectangle');
    knop.setAttribute('type', 'button');
    knop.setAttribute('value', 'X');
}

const addNodes =(rectangle, div, knop) => {
    div.appendChild(knop);
    div.appendChild(rectangle);
    document.querySelector('body > div').appendChild(div);
}
window.addEventListener("load", setup);