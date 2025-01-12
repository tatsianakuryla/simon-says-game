import {
    visibilityHandler,
    makeDifficultyInputsHidden,
    makeDifficultyInputsVisible,
} from './helpers.js';
import { renderStartGameWindow, renderVirtualKeyboard } from './dom.js';
import {
    eventListenersForKeyboard,
    documentKeydownHandler,
    playSequence,
    repeatRound,
    playNextRound,
} from './keyboardLogic.js';
import { gameState } from './gameLogic.js';

gameState.newGame();
renderStartGameWindow();

Array.from(document.getElementsByClassName('game__lvl-label')).forEach(
    (label) => {
        label.addEventListener('click', () => {
            const labelFor = label.getAttribute('for');
            gameState.difficulty = labelFor;
            gameState.newGame();
            renderVirtualKeyboard();
        });
    }
);

export const repeatBtn = document.getElementById('game__btn_sequence');
export const userInput = document.getElementById('game__user-input');
const roundCounterDiv = document.getElementById('game__round-counter');
export const newGameBtn = document.getElementById('game__btn_new');
const startBtn = document.getElementById('game__btn_start');
export const nextBtn = document.getElementById('game__btn_next');
const btnWrapper = document.getElementById('game__btn-wrapper');

startBtn.addEventListener('click', () => {
    makeDifficultyInputsHidden();
    visibilityHandler.makeHidden(startBtn);
    document.getElementById('game__lvl-heading').textContent =
        'Difficulty level:';
    btnWrapper.classList.add('game__btn-wrapper_two');

    visibilityHandler.makeVisible(repeatBtn);
    visibilityHandler.makeVisible(newGameBtn);
    visibilityHandler.makeVisible(roundCounterDiv);
    visibilityHandler.makeVisible(userInput);
    visibilityHandler.makeHidden(startBtn);

    eventListenersForKeyboard();
    documentKeydownHandler();
    playSequence(gameState.sequence);
});

newGameBtn.addEventListener('click', () => {
    makeDifficultyInputsVisible();
    renderVirtualKeyboard();
    visibilityHandler.makeHidden(newGameBtn);
    repeatBtn.disabled = '';
    nextBtn.disabled = '';
    visibilityHandler.makeHidden(repeatBtn);
    visibilityHandler.makeHidden(roundCounterDiv);
    visibilityHandler.makeHidden(userInput);
    visibilityHandler.makeVisible(startBtn);
    visibilityHandler.makeHidden(nextBtn);
    btnWrapper.classList.add('game__btn-wrapper_two');

    gameState.newGame();
    renderVirtualKeyboard();
    userInput.value = '';

    roundCounterDiv.textContent = `Round ${gameState.roundCounter} of ${gameState.roundCount}`;
});

repeatBtn.addEventListener('click', () => {
    userInput.value = '';
    gameState.repeatRound();
    repeatRound();
});

nextBtn.addEventListener('click', () => {
    visibilityHandler.makeVisible(repeatBtn);
    visibilityHandler.makeHidden(nextBtn);
    userInput.value = '';

    gameState.nextRound();
    playNextRound();

    roundCounterDiv.textContent = `Round ${gameState.roundCounter} of ${gameState.roundCount}`;
});
