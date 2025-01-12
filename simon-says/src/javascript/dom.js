import { createElementWithClass, visibilityHandler } from './helpers.js';
import { LEVELS, gameState} from './gameLogic.js';


export function getMain() {
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
    heading.textContent = 'Simon Says game';

    const lvlHeading = createElementWithClass('h3', ['game__lvl-heading']);
    lvlHeading.id = 'game__lvl-heading';
    lvlHeading.textContent = 'Select difficulty level:';

    const virtualKeyboard = createElementWithClass('div', [
        'game__virtual-keyboard',
    ]);
    virtualKeyboard.id = 'game__virtual-keyboard';

    const btnWrapper = createElementWithClass('div', [
        'game__btn-wrapper',
        'flex',
    ]);
    btnWrapper.id = 'game__btn-wrapper';

    gameSectionContainer.append(
        heading,
        lvlHeading,
        virtualKeyboard,
        btnWrapper
    );
    const pointerEventsWrapper = createElementWithClass('div', [
        'pointer-events-none',
        'hidden',
    ]);
    pointerEventsWrapper.id = 'pointer-events-none';
    main.append(gameSection, pointerEventsWrapper);

    return main;
}

export function getLevelSection() {
    const lvlFieldset = createElementWithClass('div', [
        'game__lvl-fieldset',
        'flex',
    ]);

    const lvlInputs = LEVELS.map((level) => {
        return getRadioInput(level);
    });

    lvlFieldset.append(...lvlInputs);
    return lvlFieldset;
}

export function getRadioInput(level) {
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
    levelInput.setAttribute('tabindex', '0');
    if (level === 'easy') levelInput.defaultChecked = true;

    levelLabel.setAttribute('for', level);
    levelLabel.textContent = `${level.charAt(0).toUpperCase()}${level.substr(1)}`;
    levelLabel.setAttribute('tabindex', '0');

    lvlInpWrapper.append(levelInput, levelLabel);

    return lvlInpWrapper;
}

export function getButton(action) {
    const btnWrapper = document.getElementById('game__btn-wrapper');

    const btn = createElementWithClass('button', [
        'game__btn',
        `game__btn_${action}`,
    ]);
    btn.id = `game__btn_${action}`;
    btn.textContent = `${action.charAt(0).toUpperCase()}${action.substr(1)}`;
    if (action === 'sequence') {
        btn.textContent = 'Repeat the sequence';
    }
    if (action === 'new') {
        btn.textContent = 'New game';
    }
    btnWrapper.append(btn);

    return btnWrapper;
}

export function getUserInput() {
    const userInput = createElementWithClass('input', ['game__user-input']);
    userInput.id = 'game__user-input';
    userInput.setAttribute('readonly', 'true');
    userInput.value = '';

    return userInput;
}

export function getRoundCounter(roundCounter) {
    const counter = createElementWithClass('p', ['game__round-counter']);
    counter.id = 'game__round-counter';
    counter.textContent = `Round ${roundCounter} of ${gameState.roundCount}`;
    return counter;
}

export function getKeyboardElement(element) {
    const keyboardItem = createElementWithClass('button', [
        'game__keyboard-item',
    ]);
    keyboardItem.style.pointerEvents = 'none';
    keyboardItem.textContent = element.toUpperCase();
    keyboardItem.setAttribute('data-key', element);

    return keyboardItem;
}

export function getKeyboard(array) {
    const lettersWrapper = createElementWithClass('div', [
        'game__keyboard-wrapper',
        'flex',
    ]);
    array.forEach((element) =>
        lettersWrapper.append(getKeyboardElement(element))
    );
    return lettersWrapper;
}

export function renderVirtualKeyboard() {
    const virtualKeyboard = document.getElementById('game__virtual-keyboard');
    virtualKeyboard.innerHTML = '';

    const virtualKeyboardInner = createElementWithClass('div', [
        'game__virtual-keyboard-inner',
        'flex',
    ]);
    virtualKeyboardInner.append(getKeyboard(gameState.keyboard));
    virtualKeyboard.append(virtualKeyboardInner);
    return virtualKeyboard;
}

export function renderStartGameWindow() {
    document.body.append(getMain());
    document.getElementById('game__container').append(getLevelSection(), renderVirtualKeyboard(), getButton('next'), getButton('start'), getButton('sequence'), getButton('new'));
    document.getElementById('game__btn-wrapper').after(getUserInput(), getRoundCounter(gameState.roundCounter));
    visibilityHandler.makeHidden(document.getElementById('game__btn_sequence'));
    visibilityHandler.makeHidden(document.getElementById('game__btn_new'));
    visibilityHandler.makeHidden(document.getElementById('game__btn_next'));
    visibilityHandler.makeHidden(document.getElementById('game__round-counter'));
    visibilityHandler.makeHidden(document.getElementById('game__user-input'));
}
