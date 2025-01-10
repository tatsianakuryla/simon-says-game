import {
    visibilityHandler,
} from './helpers.js';
import { getMain, getButton, renderStarGameWindow, getUserInput, getRoundCounter } from './dom.js';
import { renderVirtualKeyboard } from './keyboard.js';
import { gameState, playSequence, getSequence } from './gameDescription.js';
document.body.append(getMain());

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

function makeDifficultyInputsHidden() {
    Array.from(document.getElementsByClassName('game__lvl-label')).forEach(
        (label) => {
            label.classList.add('pointer-event');
            const labelFor = label.getAttribute('for');
            if (difficulty !== labelFor) {
                visibilityHandler.makeHidden(label);
            }
        }
    );
}

const startButton = document.getElementById('game__btn_start');
startButton.addEventListener('click', (event) => {
    event.preventDefault();
    makeDifficultyInputsHidden();
    visibilityHandler.makeHidden(startButton);
    getButton('sequence');
    getButton('new');
    document.getElementById('game__lvl-heading').innerText =
        'Difficulty level:';
    document
        .getElementById('game__btn_sequence')
        .addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('game__user-input').value = '';
            playSequence(gameState.sequence);
        });

    document
        .getElementById('game__btn-wrapper')
        .classList.add('game__btn-wrapper_two');

    document
        .getElementById('game__btn-wrapper')
        .after(getUserInput(), getRoundCounter(gameState.roundCounter));

    getSequence(gameState.roundCounter);
    playSequence(gameState.sequence);
});
