import { createElementWithClass, shuffle } from './helpers.js';
import { LETTERS, DIGITS, gameState } from './gameLogic.js';

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

    if (difficulty === 'easy')
        virtualKeyboardInner.append(getKeyboard(DIGITS));
    else if (difficulty === 'medium')
        virtualKeyboardInner.append(getKeyboard(LETTERS));
    else if (difficulty === 'hard')
        virtualKeyboardInner.append(getKeyboard([...LETTERS, ...DIGITS]));

    virtualKeyboard.append(virtualKeyboardInner);
    // eventListenersForKeyboard();
    return virtualKeyboard;
}


