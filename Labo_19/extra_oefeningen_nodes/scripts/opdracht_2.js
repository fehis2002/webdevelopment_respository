const setup = () => {
    let listItems = document.querySelectorAll('ul > li');
    for(let li of listItems) {
        li.classList.add('listitem')
    }
    let classlistItem = document.querySelectorAll('.listitem');
    for(let listItem of classlistItem) {
        listItem.style.color = 'red'
    }

    let img = document.createElement('img');
    img.setAttribute('src', '../../../Labo_3/homepage/images/marques%20%20brownlee.jpg');
    document.querySelector('ul').parentNode.appendChild(img);
}

window.addEventListener("load", setup);