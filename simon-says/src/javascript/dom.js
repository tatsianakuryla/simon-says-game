import { createElementWithClass } from './helpers.js';
import { LEVELS } from './gameDescription.js';
import { renderVirtualKeyboard } from './keyboard.js';
import { gameState } from './gameDescription.js';

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
    heading.innerText = 'Simon Says game';

    const lvlHeading = createElementWithClass('h3', ['game__lvl-heading']);
    lvlHeading.id = 'game__lvl-heading';
    lvlHeading.innerText = 'Select difficulty level:';

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
    levelLabel.innerText = `${level.charAt(0).toUpperCase()}${level.substr(1)}`;
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
    btn.innerText = `${action.charAt(0).toUpperCase()}${action.substr(1)}`;
    if (action === 'sequence') {
        btn.innerText = 'Repeat the sequence';
    }
    if (action === 'new') {
        btn.innerText = 'New game';
    }
    btnWrapper.append(btn);

    return btnWrapper;
}

export function renderStarGameWindow() {
    document
        .getElementById('game__container')
        .append(getLevelSection(), renderVirtualKeyboard(), getButton('start'));
}

export function getUserInput() {
    const userInput = createElementWithClass('input', ['game__user-input']);
    userInput.id = 'game__user-input';
    userInput.value = gameState.userInputValue;

    return userInput;
}

export function getRoundCounter(roundCounter) {
    const counter = createElementWithClass('p', ['game__round-counter']);
    counter.innerText = `Round ${roundCounter} of 5`;

    return counter;
}