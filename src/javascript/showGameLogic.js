import {
    visibilityHandler,
    userInputHandler,
    buttonHighlighter,
} from './helpers.js';
import { gameState } from './gameState.js';
import { userInput, repeatBtn, nextBtn, newGameBtn } from './main.js';
import { keyboardState } from './keyboardState.js';

export function showRoundLost() {
    setTimeout(() => {
        userInput.value = 'You are mistaken!';
    }, 600);
    keyboardState.disableKeyboard();
}

export function showRoundWon() {
    if (gameState.isLastRound()) {
        setTimeout(() => {
            userInput.value = 'You won the game!';
            repeatBtn.disabled = 'true';
            newGameBtn.focus();
        }, 600);

    } else {
        setTimeout(() => {
            userInput.value = 'Good game! Next!';
            visibilityHandler.makeHidden(repeatBtn);
            visibilityHandler.makeVisible(nextBtn);
            nextBtn.focus();
        }, 600);
    }
    keyboardState.disableKeyboard();
}

export function showRoundRepeat() {
    repeatBtn.focus();
}

function disableRoundRepeat() {
    repeatBtn.disabled = 'true';
    newGameBtn.focus();
}

export function showGameLost() {
    newGameBtn.focus();
}

export function repeatRound() {
    playSequence(gameState.sequence);
    if (!gameState.isRoundRepeatAvailable()) {
        disableRoundRepeat();
    }
}

export function playNextRound() {
    playSequence(gameState.sequence);
}

export function playSequence(sequence) {
    setTimeout(() => {
        userInputHandler.enableBlock();
        sequence.forEach((item, index) => {
            setTimeout(() => {
                const foundButton = document.querySelector(
                    `[data-key="${item}"]`
                );
                buttonHighlighter(foundButton);
            }, 600 * index);
        });
        setTimeout(() => {
            userInputHandler.disableBlock();
            keyboardState.enableKeyboard();
        }, 600 * sequence.length);
    }, 300);
}