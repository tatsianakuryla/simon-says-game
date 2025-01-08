function createElementWithClass(tag, classNames = null) {
    const element = document.createElement(tag);
    if(classNames) {
        classNames.forEach(name => {
            element.classList.add(name);
        });
    }
   
    return element;
}

function getHeader() {
    const header = createElementWithClass('header', ['header']);

    const headerContainer = createElementWithClass('div', ['container', 'header__container']);

    const heading = createElementWithClass('h1', ['header__heading']);
    heading.innerText = 'Simon says game! You are welcome!';

    headerContainer.append(heading);
    header.append(headerContainer);

    return header;
}
function getMain() {
    const main = createElementWithClass('main');

    const gameSection = createElementWithClass('section', ['game']);

    const gameSectionContainer = createElementWithClass('div', ['container', 'game__container']);
    gameSectionContainer.id = 'game__container';

    gameSection.append(gameSectionContainer);

    main.append(gameSection);

    return main;
}
document.body.append(getHeader(), getMain());

const LEVELS = ['easy', 'medium', 'hard'];
// const BUTTONS = ['start', 'repeat the sequence', 'new game', 'next'];

function getLevelSection() {
    const lvlFieldset = createElementWithClass('fieldset',[ 'game__lvl-fieldset']);

    const lvlLegend = createElementWithClass('legend', ['game__lvl-legend']);
    lvlLegend.innerText = 'Select a level of difficulty';

    const lvlInputs = LEVELS.map(level => {
        return getRadioInput(level);
    });

    lvlFieldset.append(lvlLegend, ...lvlInputs);
    return lvlFieldset;
}

function getRadioInput(level) {
    const lvlInpWrapper = createElementWithClass('div', ['game__lvl-inp-wrapper', `game__lvl-inp-wrapper_${level}`]);;
    const levelInput = createElementWithClass('input', ['game__lvl-input', `game__lvl-input_${level}`]);
    const levelLabel = createElementWithClass('label', ['game__lvl-label', `game__lvl-label_${level}`]);


    levelInput.type = 'radio';
    levelInput.name = 'level';
    levelInput.value = level;
    levelInput.id = level;
    if(level === 'easy') {
        levelInput.setAttribute('checked', 'true');
    }

    levelLabel.for = level;
    levelLabel.innerText = `${level.charAt(0).toUpperCase()}${level.substr(1)}`;

    lvlInpWrapper.append(levelInput, levelLabel);

    return lvlInpWrapper;
}

function getButton(action) {
    const btn = createElementWithClass('button', ['game__btn', `game__btn_${action}`]);
    btn.innerText = `${action.charAt(0).toUpperCase()}${action.substr(1)}`;;

    return btn;
}

function getStartGameInner() {
    const gameAppWrapper = createElementWithClass('div', ['game__app-wrapper']);

    const virtualKeyboardList = createElementWithClass('ul', ['game__virtual-keyboard']);
    virtualKeyboardList.id = 'game__virtual-keyboard';

    gameAppWrapper.append(virtualKeyboardList, getButton('start'));

    return gameAppWrapper;
}

function renderStarGameWindow() {
    document.getElementById('game__container').append(getLevelSection(), getStartGameInner());
}
renderStarGameWindow();
