import {
    visibilityHandler,
    makeDifficultyInputsHidden,
    makeDifficultyInputsVisible,
} from './helpers.js';
import {
    renderStartGameWindow,
} from './dom.js';
import { renderVirtualKeyboard, eventListenersForKeyboard, documentKeydownHandler } from './keyboard.js';
import { gameState, playSequence, getSequence } from './gameLogic.js';

renderStartGameWindow();

Array.from(document.getElementsByClassName('game__lvl-label')).forEach(
    (label) => {
        label.addEventListener('click', () => {
            const labelFor = label.getAttribute('for');
            gameState.difficulty = labelFor;
            renderVirtualKeyboard(labelFor);
        });
    }
);

export const repeatBtn = document.getElementById('game__btn_sequence');
export const userInput = document.getElementById('game__user-input');
const roundCounterDiv = document.getElementById('game__round-counter');
const newGameBtn = document.getElementById('game__btn_new');
const startBtn = document.getElementById('game__btn_start');
export const nextBtn = document.getElementById('game__btn_next');
const btnWrapper = document.getElementById('game__btn-wrapper');

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    makeDifficultyInputsHidden();
    visibilityHandler.makeHidden(startBtn);
    document.getElementById('game__lvl-heading').textContent = 'Difficulty level:';

    btnWrapper.classList.add('game__btn-wrapper_two');
    visibilityHandler.makeVisible(repeatBtn);
    visibilityHandler.makeVisible(newGameBtn);
    visibilityHandler.makeVisible(roundCounterDiv);
    visibilityHandler.makeVisible(userInput);
    visibilityHandler.makeHidden(startBtn);

    eventListenersForKeyboard();
    documentKeydownHandler();
    getSequence(gameState.roundCounter);
    playSequence(gameState.sequence);
});

newGameBtn.addEventListener('click', (event) => {
    event.preventDefault();
    makeDifficultyInputsVisible();
    renderVirtualKeyboard(gameState.difficulty);
    visibilityHandler.makeHidden(newGameBtn);
    repeatBtn.disabled = '';
    nextBtn.disabled = '';
    visibilityHandler.makeHidden(repeatBtn);
    visibilityHandler.makeHidden(roundCounterDiv);
    visibilityHandler.makeHidden(userInput);
    visibilityHandler.makeVisible(startBtn);
    visibilityHandler.makeHidden(nextBtn);
    btnWrapper.classList.add('game__btn-wrapper_two');
    gameState.roundCounter = 1;
    gameState.playingTimes = 1;
    gameState.sequence = [];
    gameState.playedKeys = [];
    userInput.value = '';
    roundCounterDiv.textContent = `Round ${gameState.roundCounter} of 5`;
});

repeatBtn.addEventListener('click', (event) => {
    event.preventDefault();
    userInput.value = '';
    gameState.playingTimes++;
    Array.from(document.getElementsByClassName('game__keyboard-item')).forEach(btn => btn.style.pointerEvents = '');
    playSequence(gameState.sequence);
});

nextBtn.addEventListener('click', (event) => {
    event.preventDefault();
    visibilityHandler.makeVisible(repeatBtn);
    visibilityHandler.makeHidden(nextBtn);
    gameState.roundCounter++;
    gameState.playingTimes = 1;
    gameState.sequence = [];
    gameState.playedKeys = [];
    roundCounterDiv.textContent = `Round ${gameState.roundCounter} of 5`;
    getSequence(gameState.roundCounter);
    playSequence(gameState.sequence);
    userInput.value = '';
    Array.from(document.getElementsByClassName('game__keyboard-item')).forEach(btn => btn.style.pointerEvents = '');
    if(gameState.roundCounter >= 5) {
        nextBtn.disabled = 'true';
    }
});