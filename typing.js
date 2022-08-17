
let text = {
    textModule: document.querySelector('.text'),
    contentOfText: document.querySelector('.text').textContent.replace(/\n +/g, ''),
    lengthOfText() { return this.contentOfText.length },
    currentIndex: 0,
    mistakeField: document.querySelector('.mistakes__result--value'),
    mistakePercentField: document.querySelector('.mistakes__result--percentage'),
    speedResultField: document.querySelector('.speed__result--value'),
    totalMistakes: 0,
    setPercentMistakes() {
        let res = Math.round(this.totalMistakes / this.lengthOfText() * 100);
        if (res < 10) { res = '0' + res };
        return res;
    },
    setMistakesFields() {
        this.mistakeField.textContent = this.totalMistakes + '/';
        this.mistakePercentField.textContent = this.setPercentMistakes()
    }
}

stepForward();//initial: first letter is imphasized


//apply when tap is correct
function stepForward() {
    progressLine();//line color change

    if (document.querySelector('.showNextButton.menu__item--active')&&text.currentIndex < text.contentOfText) {
        showTargetKey(text.currentIndex);//imphasize the key at the keyboard
    }

    let prevText;

    let module = document.querySelector('.text')

    prevText = (text.currentIndex) ? text.contentOfText.slice(0, text.currentIndex) : "";
    let currentLetter = text.contentOfText[text.currentIndex];

    let pastText;
    if (text.currentIndex > text.lengthOfText() - 1) {
        text.currentIndex++; //last current is text.length
        return;
    }

    //join 3 segments of text
    pastText = (text.currentIndex < text.lengthOfText() - 1) ? text.contentOfText.slice(text.currentIndex + 1) : '';
    let newText = `${prevText}<span class="currentLetter">${currentLetter}</span>${pastText}`;
    text.textModule.innerHTML = newText;
    text.currentIndex++;



    //scroll field

    if (text.currentIndex > 1) {
        let imphasizer = document.querySelector('.currentLetter');
        if (imphasizer.offsetTop >= 126) {
            module.scrollTop = imphasizer.offsetTop - 42;
        }
    }
}

//show total value of letters and typed letter
function progressLine() {
    let caption = document.querySelector('.progressLine__caption--right');
    caption.textContent = `${text.currentIndex}/${text.lengthOfText()}`
    progeressIndicator();
}


//timer
function timer() {
    let time = document.querySelector('.time__result');
    let currentTime = 0;
    let setTime = setInterval(startTimer, 1000);
    function startTimer() {
        let min = '00';
        let sec = '00';
        if (text.currentIndex < text.lengthOfText()) {
            if (currentTime == 3599) {
                clearInterval(setTime);
                return;
            }
            currentTime += 1;
            sec = (currentTime % 60 < 10) ? '0' + currentTime % 60 : currentTime % 60;
            min = (Math.floor(currentTime / 60) < 10) ? '0' + Math.floor(currentTime / 60) : Math.floor(currentTime / 60);
            time.textContent = `${min}:${sec}`;
            if (currentTime % 10 === 0) {
                calcSpeed(currentTime);
            }
        } else {
            calcSpeed(currentTime);
            clearInterval(setTime);
        }
    }
}

function calcSpeed(ms) {
    text.speedResultField.textContent = Math.round(text.currentIndex / (ms / 60))
}


//color line progress
function progeressIndicator() {
    let linePast = document.querySelector('.progressLine__indicator--past');
    let percentPast = Math.round(text.currentIndex / text.lengthOfText() * 100);
    linePast.setAttribute('style', `width : ${percentPast}%`)
}



//when we type
document.addEventListener('keydown', checkKey);
document.addEventListener('keydown', startTimer);


function checkKey(event) {
    let currentLetter = document.querySelector('.currentLetter')
    const acceptedKeys = ['Shift', 'CapsLock', 'Control', 'Alt']
    if (event.key == currentLetter.textContent) {
        stepForward();
    } else {
        if (acceptedKeys.includes(event.key)) { return };
        text.totalMistakes++;
        text.setMistakesFields();

        let soundSwitcher = document.querySelector('.sound');
        if (soundSwitcher.classList.contains('menu__item--active')) {
            soundError();
        }

        changeColor(currentLetter)
    }
}

function changeColor(element) {
    element.setAttribute('style', 'background-color : red')
    setTimeout(changeColorBack, 500);
    function changeColorBack() {
        element.setAttribute('style', 'background-color : black')
    }
}

function startTimer() {
    timer();
    document.removeEventListener('keydown', startTimer)
}

function soundError() {
    let audio = new Audio();
    audio.src = './sound/oh-well.wav'
    audio.autoplay = true;
}

function showTargetKey(index) {
    const keyboard = document.querySelector('.keyboard')
    const leftShiftKeys = `^&*()_+YUIOP{}|HJKL:"NM<>?`.split('');
    const rightShiftKeys = '~!@#$%^QWERTASDFGZXCVB'.split('')
    const leftShift = document.querySelector('.key__shift--left')
    const rightShift = document.querySelector('.key__shift--right')
    const symbol = text.contentOfText[index];
    let oldNext = document.querySelectorAll('.next')

    for (let e of oldNext) {
        e.classList.remove('next')
    }

    //for SPACE only

    if (symbol === ' ') {
        let space = document.querySelector('[data-key="SPACE"]');
        space.classList.add('next')
    }

    //for all keys axcept SPACE

    let allKeys = keyboard.querySelectorAll('.key__label');

    for (let key of allKeys) {
        if (key.textContent === symbol.toLowerCase()) {
            key.parentElement.classList.add('next');
        }
    }
    //for shift
    if (leftShiftKeys.includes(symbol)) {
        leftShift.classList.add('next');
    } else if (rightShiftKeys.includes(symbol)) {
        rightShift.classList.add('next');
    }
}

export{showTargetKey as switchOnTargetKey, text as text};