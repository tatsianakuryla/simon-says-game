function createElementWithClass(tag, classNames = []) {
    const element = document.createElement(tag);
    classNames.forEach((name) => element.classList.add(name));

    return element;
}

function getMain() {
    const main = createElementWithClass('main', ['main']);
    const gameSection = createElementWithClass('section', ['game']);
    gameSection.id = 'game';
    const gameSectionContainer = createElementWithClass('div', [
        'container',
        'game__container',
        'flex',
    ]);
    gameSectionContainer.id = 'game__container';

    gameSection.append(gameSectionContainer);

    const heading = createElementWithClass('h1', ['game__heading']);
    heading.innerText = 'Simon Says game';

    const virtualKeyboard = createElementWithClass('div', [
        'game__virtual-keyboard',
    ]);
    virtualKeyboard.id = 'game__virtual-keyboard';

    const btnWrapper = createElementWithClass('div', [
        'game__btn-wrapper',
        'flex',
    ]);
    btnWrapper.id = 'game__btn-wrapper';

    gameSectionContainer.append(heading, virtualKeyboard, btnWrapper);
    const pointerEventsWrapper = createElementWithClass('div', [
        'pointer-events-none',
        'hidden',
    ]);
    pointerEventsWrapper.id = 'pointer-events-none';
    main.append(gameSection, pointerEventsWrapper);

    return main;
}
document.body.append(getMain());

const LEVELS = ['easy', 'medium', 'hard'];

function getLevelSection() {
    const lvlFieldset = createElementWithClass('fieldset', [
        'game__lvl-fieldset',
        'flex',
    ]);

    const lvlHeading = createElementWithClass('span', ['game__lvl-heading']);
    lvlHeading.innerText = 'Select difficulty level:';

    const lvlInputs = LEVELS.map((level) => {
        return getRadioInput(level);
    });

    lvlFieldset.append(lvlHeading, ...lvlInputs);
    return lvlFieldset;
}

function getRadioInput(level) {
    const lvlInpWrapper = createElementWithClass('div', [
        'game__lvl-inp-wrapper',
        `game__lvl-inp-wrapper_${level}`,
        'flex',
    ]);

    const levelInput = createElementWithClass('input', [
        'game__lvl-input',
        `game__lvl-input_${level}`,
    ]);
    const levelLabel = createElementWithClass('label', [
        'game__lvl-label',
        `game__lvl-label_${level}`,
        'flex',
    ]);

    levelLabel.setAttribute('tabindex', '0');

    levelInput.type = 'radio';
    levelInput.name = 'level';
    levelInput.value = level;
    levelInput.id = level;
    if (level === 'easy') levelInput.defaultChecked = true;

    levelLabel.setAttribute('for', level);
    levelLabel.innerText = `${level.charAt(0).toUpperCase()}${level.substr(1)}`;

    lvlInpWrapper.append(levelInput, levelLabel);

    return lvlInpWrapper;
}

function getButton(action) {
    const btnWrapper = document.getElementById('game__btn-wrapper');

    const btn = createElementWithClass('button', [
        'game__btn',
        `game__btn_${action}`,
    ]);
    btn.id = `game__btn_${action}`;
    btn.innerText = `${action.charAt(0).toUpperCase()}${action.substr(1)}`;
    if (action === 'sequence') {
        btn.innerText = 'Repeat the sequence';
    }
    btnWrapper.append(btn);

    return btnWrapper;
}

const LETTERS = [
    {
        key: 'q',
        code: 'KeyQ',
    },
    {
        key: 'w',
        code: 'KeyW',
    },
    {
        key: 'e',
        code: 'KeyE',
    },
    {
        key: 'r',
        code: 'KeyR',
    },
    {
        key: 't',
        code: 'KeyT',
    },
    {
        key: 'y',
        code: 'KeyY',
    },
    {
        key: 'u',
        code: 'KeyU',
    },
    {
        key: 'i',
        code: 'KeyI',
    },
    {
        key: 'o',
        code: 'KeyO',
    },
    {
        key: 'p',
        code: 'KeyP',
    },
    {
        key: 'a',
        code: 'KeyA',
    },
    {
        key: 's',
        code: 'KeyS',
    },
    {
        key: 'd',
        code: 'KeyD',
    },
    {
        key: 'f',
        code: 'KeyF',
    },
    {
        key: 'g',
        code: 'KeyG',
    },
    {
        key: 'h',
        code: 'KeyH',
    },
    {
        key: 'j',
        code: 'KeyJ',
    },
    {
        key: 'k',
        code: 'KeyK',
    },
    {
        key: 'l',
        code: 'KeyL',
    },
    {
        key: 'z',
        code: 'KeyZ',
    },
    {
        key: 'x',
        code: 'KeyX',
    },
    {
        key: 'c',
        code: 'KeyC',
    },
    {
        key: 'v',
        code: 'KeyV',
    },
    {
        key: 'b',
        code: 'KeyB',
    },
    {
        key: 'n',
        code: 'KeyN',
    },
    {
        key: 'm',
        code: 'KeyM',
    },
];

const DIGITS = [
    {
        key: '1',
        code: 'Digit1',
    },
    {
        key: '2',
        code: 'Digit2',
    },
    {
        key: '3',
        code: 'Digit3',
    },
    {
        key: '4',
        code: 'Digit4',
    },
    {
        key: '5',
        code: 'Digit5',
    },
    {
        key: '6',
        code: 'Digit6',
    },
    {
        key: '7',
        code: 'Digit7',
    },
    {
        key: '8',
        code: 'Digit8',
    },
    {
        key: '9',
        code: 'Digit9',
    },
    {
        key: '0',
        code: 'Digit0',
    },
];

function getKeyboardElement(element) {
    const keyboardItem = createElementWithClass('button', [
        'game__keyboard-item',
    ]);
    keyboardItem.innerText = element.key.toUpperCase();
    keyboardItem.setAttribute('data-key', element.code);

    return keyboardItem;
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}

function getKeyboard(array) {
    const lettersWrapper = createElementWithClass('div', [
        'game__keyboard-wrapper',
        'flex',
    ]);
    shuffle(array).forEach((element) =>
        lettersWrapper.append(getKeyboardElement(element))
    );
    return lettersWrapper;
}

function renderVirtualKeyboard(inputChecked = 'easy') {
    const virtualKeyboard = document.getElementById('game__virtual-keyboard');
    virtualKeyboard.innerHTML = '';

    const virtualKeyboardInner = createElementWithClass('div', [
        'game__virtual-keyboard-inner',
        'flex',
    ]);

    if (inputChecked === 'easy')
        virtualKeyboardInner.append(getKeyboard(DIGITS));
    else if (inputChecked === 'medium')
        virtualKeyboardInner.append(getKeyboard(LETTERS));
    else if (inputChecked === 'hard')
        virtualKeyboardInner.append(getKeyboard([...LETTERS, ...DIGITS]));

    virtualKeyboard.append(virtualKeyboardInner);

    return virtualKeyboard;
}

function renderStarGameWindow() {
    document
        .getElementById('game__container')
        .append(getLevelSection(), renderVirtualKeyboard(), getButton('start'));
}
renderStarGameWindow();

let difficulty = 'easy';

Array.from(document.getElementsByClassName('game__lvl-label')).forEach(
    (label) => {
        label.addEventListener('click', () => {
            const labelFor = label.getAttribute('for');
            difficulty = labelFor;
            renderVirtualKeyboard(labelFor);
        });
    }
);

//start game visualization
function makeHidden(element) {
    element.classList.add('hidden');
}

function makeVisible(element) {
    element.classList.remove('hidden');
}

function enableBlock() {
    const enablingBlock = document.getElementById('pointer-events-none');
    enablingBlock.classList.remove('hidden');
    document.body.style.pointerEvents = 'none';
    document.addEventListener('keydown', preventKeyDown);
    const repeatBtn = document.getElementById('game__btn_sequence');
    const nextBtn = document.getElementById('game__btn_next');
    repeatBtn.disabled = 'true';
    nextBtn.disabled = 'true';
}

// Функция для разблокировки
function disableBlock() {
    const enablingBlock = document.getElementById('pointer-events-none');
    enablingBlock.classList.add('hidden');
    document.body.style.pointerEvents = 'auto';
    document.removeEventListener('keydown', preventKeyDown);
    const repeatBtn = document.getElementById('game__btn_sequence');
    const nextBtn = document.getElementById('game__btn_next');
    nextBtn.disabled = '';
    if(playingTimes < 2) {
        repeatBtn.disabled = '';
    }
}

// Функция для предотвращения ввода с клавиатуры
function preventKeyDown(event) {
    event.preventDefault();
    event.stopPropagation();
}

function makeDifficultyInputsHidden() {
    Array.from(document.getElementsByClassName('game__lvl-label')).forEach(
        (label) => {
            label.classList.add('pointer-event');
            const labelFor = label.getAttribute('for');
            if (difficulty !== labelFor) {
                makeHidden(label);
            }
        }
    );
}

let roundCounter = 2;
let userInputValue = '';
let playingTimes = 0;

function getRoundCounter(roundCounter) {
    const counter = createElementWithClass('p', ['game__round-counter']);
    counter.innerText = `Round ${roundCounter} of 5`;

    return counter;
}

function getUserInput() {
    const userInput = createElementWithClass('input', ['game__user-input']);
    userInput.id = 'game__user-input';
    userInput.value = userInputValue;

    return userInput;
}

const startButton = document.getElementById('game__btn_start');
startButton.addEventListener('click', (event) => {
    event.preventDefault();
    makeDifficultyInputsHidden();
    makeHidden(startButton);
    getButton('sequence');
    getButton('next');

    const repeatBtn = document.getElementById('game__btn_sequence');
    repeatBtn.addEventListener('click', (event) => {
        event.preventDefault();
        setTimeout(() => {
            playSequence(sequence);
        }, 800);
    });

    document
        .getElementById('game__btn-wrapper')
        .classList.add('game__btn-wrapper_two');

    document
        .getElementById('game__btn-wrapper')
        .after(getUserInput(), getRoundCounter(roundCounter));

    document.getElementById('game__user-input').focus();
    getSequence(roundCounter);
    setTimeout(() => {
        playSequence(sequence);
    }, 800);
});

let sequence = [];

//start game implementation
function getSequence(roundCounter) {
    const keyboard = Array.from(
        document.getElementsByClassName('game__keyboard-item')
    );
    for (let i = 0; i < roundCounter * 2; i++) {
        sequence.push(Math.floor(Math.random() * keyboard.length));
    }
    sequence.forEach((input) => console.log(keyboard[input].innerText));
}

function playSequence(sequence) {
    enableBlock();
    const keyboard = Array.from(
        document.getElementsByClassName('game__keyboard-item')
    );
    sequence.forEach((item, index) => {
        setTimeout(() => {
            keyboard[item].classList.add('active');

            setTimeout(() => {
                keyboard[item].classList.remove('active');
            }, 400);
        }, 800 * index);
    });
    setTimeout(() => {
        disableBlock();
    }, 800 * sequence.length);
    playingTimes++;
}
