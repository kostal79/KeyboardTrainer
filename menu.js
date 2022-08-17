
import {switchOnTargetKey, text} from './typing.js'


let menu = document.querySelector('.menu')
let metronomeSound;

setColor()

menu.addEventListener('click', switchFunction);

function switchFunction(event) {
    if (!event.target.closest('.menu__item .menu__img')) return;
    let item = event.target.closest('.menu__item');
    changeStatusFunction(item)
    changeIconActivity(item)
    //coloring fingers zones
    if (event.target.closest('.color.menu__item--active')) {
        setColor();
    } else if (event.target.closest('.color.menu__item--disactive')) {
        clearColor();
        //letter show and hide
    } else if (event.target.closest('.letter.menu__item--active')) {
        showLetters();
    } else if (event.target.closest('.letter.menu__item--disactive')) {
        hideLetters();
        //metronome
    } else if (event.target.closest('.metronom.menu__item--active')) {
        startMetronome();
    } else if (event.target.closest('.metronom.menu__item--disactive')) {
        clearInterval(metronomeSound);
    } else if (event.target.closest('.showNextButton.menu__item--disactive')) {
        switchOffTargetKey()
    } else if (event.target.closest('.showNextButton.menu__item--active')) {
        switchOnTargetKey(text.currentIndex - 1)
    }
}

function changeStatusFunction(item) {
    if (item.classList.contains('menu__item--active')) {
        item.classList.remove('menu__item--active')
        item.classList.add('menu__item--disactive')
    }
    else if (item.classList.contains('menu__item--disactive')) {
        item.classList.remove('menu__item--disactive');
        item.classList.add('menu__item--active')
    }
}

function changeIconActivity(item) {
    item.children[1].classList.toggle('on')
}

menu.addEventListener('click', chooseKeyboard)

function chooseKeyboard(event) {
    if (event.target.tagName != 'INPUT') return;
    let keyboard = document.querySelector('input[name="keyboardType"]:checked').value

    //TODO: make changing of keyboard
}

function setColor() {
    let keys = document.querySelectorAll('.key--colored');
    for (let key of keys) {
        let color = key.dataset.keycolor
        key.style.backgroundColor = `${color}`;
    }
}

function clearColor() {
    let keys = document.querySelectorAll('.key--colored');
    for (let key of keys) {
        key.style.backgroundColor = 'white';
    }
}

function hideLetters() {
    let keys = document.querySelectorAll('.key__label')
    for (let key of keys) {
        key.style.display = 'none';
    }
}

function showLetters() {
    let keys = document.querySelectorAll('.key__label')
    for (let key of keys) {
        keykey.style.display = 'block';
    }
}

function startMetronome() {
        metronomeSound = setInterval(makeSound, 1000);
}

function makeSound() {
    let audio = new Audio();
    audio.src = "./sound/metronomic.wav";
    audio.autoplay = true;
}

function switchOffTargetKey() {
    let targets = document.querySelectorAll('.next')
    for (let el of targets) {
        el.classList.remove('next')
    }
}

