import {
    visibilityHandler,
    makeDifficultyInputsHidden,
    makeDifficultyInputsVisible,
} from './helpers.js';
import {
    renderStarGameWindow,
} from './dom.js';
import { renderVirtualKeyboard } from './keyboard.js';
import { gameState, playSequence, getSequence } from './gameLogic.js';

renderStarGameWindow();

Array.from(document.getElementsByClassName('game__lvl-label')).forEach(
    (label) => {
        label.addEventListener('click', () => {
            const labelFor = label.getAttribute('for');
            gameState.difficulty = labelFor;
            renderVirtualKeyboard(labelFor);
        });
    }
);

const repeatBtn = document.getElementById('game__btn_sequence');
const userInput = document.getElementById('game__user-input');
const roundCounterDiv = document.getElementById('game__round-counter');
const newGameBtn = document.getElementById('game__btn_new');
const startBtn = document.getElementById('game__btn_start');
const nextBtn = document.getElementById('game__btn_next');
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

    getSequence(gameState.roundCounter);
    playSequence(gameState.sequence);
});

newGameBtn.addEventListener('click', (event) => {
    event.preventDefault();
    makeDifficultyInputsVisible();
    renderVirtualKeyboard(gameState.difficulty);
    visibilityHandler.makeHidden(newGameBtn);
    repeatBtn.disabled = '';
    visibilityHandler.makeHidden(repeatBtn);
    visibilityHandler.makeHidden(roundCounterDiv);
    visibilityHandler.makeHidden(userInput);
    visibilityHandler.makeVisible(startBtn);
    btnWrapper.classList.add('game__btn-wrapper_two');
    gameState.roundCounter = 1;
    gameState.playingTimes = 1;
    gameState.sequence = [];
    gameState.playedKeys = [];
    roundCounterDiv.textContent = `Round ${gameState.roundCounter} of 5`;
});

repeatBtn.addEventListener('click', (event) => {
    event.preventDefault();
    userInput.value = '';
    gameState.playingTimes++;
    playSequence(gameState.sequence);
});

nextBtn.addEventListener('click', (event) => {
    event.preventDefault();
    gameState.roundCounter++;
    gameState.playingTimes = 1;
    gameState.sequence = [];
    gameState.playedKeys = [];
    roundCounterDiv.textContent = `Round ${gameState.roundCounter} of 5`;
});

