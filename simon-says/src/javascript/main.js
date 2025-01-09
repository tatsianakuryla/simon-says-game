function createElementWithClass(tag, classNames = []) {
    const element = document.createElement(tag);
    classNames.forEach((name) => element.classList.add(name));

    return element;
}

function getMain() {
    const main = createElementWithClass('main');
    const gameSection = createElementWithClass('section', ['game']);
    const gameSectionContainer = createElementWithClass('div', [
        'container',
        'game__container',
        'flex',
    ]);
    gameSectionContainer.id = 'game__container';

    gameSection.append(gameSectionContainer);

    const heading = createElementWithClass('h1', ['game__heading']);
    heading.innerText = 'Simon Says game';

    const lvlHeading = createElementWithClass('h2', ['game__lvl-heading']);
    lvlHeading.innerText = 'Select difficulty level';

    const virtualKeyboard = createElementWithClass('div', [
        'game__virtual-keyboard',
    ]);
    virtualKeyboard.id = 'game__virtual-keyboard';

    gameSectionContainer.append(heading, lvlHeading, virtualKeyboard);
    main.append(gameSection);

    return main;
}
document.body.append(getMain());

const LEVELS = ['easy', 'medium', 'hard'];

function getLevelSection() {
    const lvlFieldset = createElementWithClass('fieldset', [
        'game__lvl-fieldset',
        'flex',
    ]);

    const lvlInputs = LEVELS.map((level) => {
        return getRadioInput(level);
    });

    lvlFieldset.append(...lvlInputs);
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

    levelInput.type = 'radio';
    levelInput.name = 'level';
    levelInput.value = level;
    levelInput.id = level;
    if (level === 'easy') {
        levelInput.setAttribute('checked', 'true');
    }

    levelLabel.setAttribute('for', level);
    levelLabel.innerText = `${level.charAt(0).toUpperCase()}${level.substr(1)}`;

    lvlInpWrapper.append(levelInput, levelLabel);

    return lvlInpWrapper;
}

function getButton(action) {
    const btn = createElementWithClass('button', [
        'game__btn',
        `game__btn_${action}`,
    ]);
    btn.innerText = `${action.charAt(0).toUpperCase()}${action.substr(1)}`;

    return btn;
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

    if (inputChecked === 'easy') virtualKeyboardInner.append(getKeyboard(DIGITS));
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

Array.from(document.getElementsByClassName('game__lvl-label')).forEach((label) => {
    label.addEventListener('click', () => {
        const labelFor = label.getAttribute('for');

        renderVirtualKeyboard(labelFor);
    })
})
