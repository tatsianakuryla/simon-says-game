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

    gameSectionContainer.append(heading, lvlHeading);
    main.append(gameSection);

    return main;
}
document.body.append(getMain());

const LEVELS = ['easy', 'medium', 'hard'];
// const BUTTONS = ['start', 'repeat the sequence', 'new game', 'next'];

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

function getStartGameInner() {
    const gameAppWrapper = createElementWithClass('div', ['game__app-wrapper']);

    const virtualKeyboardList = createElementWithClass('ul', [
        'game__virtual-keyboard',
    ]);
    virtualKeyboardList.id = 'game__virtual-keyboard';

    gameAppWrapper.append(virtualKeyboardList, getButton('start'));

    return gameAppWrapper;
}

function renderStarGameWindow() {
    document
        .getElementById('game__container')
        .append(getLevelSection(), getStartGameInner());
}
renderStarGameWindow();
