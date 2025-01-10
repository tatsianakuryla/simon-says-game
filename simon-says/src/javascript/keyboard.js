import { createElementWithClass, shuffle } from './helpers.js';
import { LETTERS, DIGITS } from './gameDescription.js';

export function getKeyboardElement(element) {
    const keyboardItem = createElementWithClass('button', [
        'game__keyboard-item',
    ]);
    keyboardItem.innerText = element.key.toUpperCase();
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

export function renderVirtualKeyboard(inputChecked = 'easy') {
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
