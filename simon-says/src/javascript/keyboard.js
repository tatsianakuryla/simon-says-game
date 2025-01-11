import { createElementWithClass, shuffle, visibilityHandler } from './helpers.js';
import { LETTERS, DIGITS, gameState } from './gameLogic.js';
import { userInput, repeatBtn, nextBtn } from './main.js';

export function getKeyboardElement(element) {
    const keyboardItem = createElementWithClass('button', [
        'game__keyboard-item',
    ]);
    keyboardItem.textContent = element.key.toUpperCase();
    keyboardItem.setAttribute('data-key', element.code);

    return keyboardItem;
}

export function getKeyboard(array) {
    const lettersWrapper = createElementWithClass('div', [
        'game__keyboard-wrapper',
        'flex',
    ]);
    shuffle(array).forEach((element) =>
        lettersWrapper.append(getKeyboardElement(element))
    );
    return lettersWrapper;
}

export function renderVirtualKeyboard(difficulty = 'easy') {
    const virtualKeyboard = document.getElementById('game__virtual-keyboard');
    virtualKeyboard.innerHTML = '';

    const virtualKeyboardInner = createElementWithClass('div', [
        'game__virtual-keyboard-inner',
        'flex',
    ]);

    if (difficulty === 'easy') virtualKeyboardInner.append(getKeyboard(DIGITS));
    else if (difficulty === 'medium')
        virtualKeyboardInner.append(getKeyboard(LETTERS));
    else if (difficulty === 'hard')
        virtualKeyboardInner.append(getKeyboard([...LETTERS, ...DIGITS]));

    virtualKeyboard.append(virtualKeyboardInner);
    return virtualKeyboard;
}

let stringArray = [];
export let inputCounter = -1;

export function eventListenersForKeyboard() {
    const keyboard = Array.from(
        document.getElementsByClassName('game__keyboard-item')
    );

    keyboard.forEach((button) => {
        button.addEventListener('click', (event) => {
            inputCounter++;
            console.log(gameState.playedKeys, gameState.playedKeys[inputCounter], event.target.getAttribute('data-key'));
            if (event.target.getAttribute('data-key') === gameState.playedKeys[inputCounter]) {
                stringArray.push(button.textContent);
                userInput.value = userInput.value + button.textContent;
            } 
            if (stringArray.length === gameState.playedKeys.length) {
                userInput.value = 'Good game!';
                inputCounter = -1;
                stringArray = [];
                visibilityHandler.makeHidden(repeatBtn);
                visibilityHandler.makeVisible(nextBtn);
                keyboard.forEach(btn => btn.style.pointerEvents = 'none');
            } else if (event.target.getAttribute('data-key') !== gameState.playedKeys[inputCounter]) {
                userInput.value = 'You are mistaken!';
                inputCounter = -1;
                stringArray = [];
                keyboard.forEach(btn => btn.style.pointerEvents = 'none');
                repeatBtn.focus();
            }
        });
    });
}

export function documentKeydownHandler() {
    document.addEventListener('keydown', (event) => {
        event.preventDefault();
        const keyboard = Array.from(
            document.getElementsByClassName('game__keyboard-item')
        );
        keyboard.forEach(button => {
            if(button.getAttribute('data-key') === event.code) {
                button.click();
            }
        })
    });
}