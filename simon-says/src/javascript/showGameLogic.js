import {
    visibilityHandler,
    userInputHandler,
    buttonHighlighter,
} from './helpers.js';
import { gameState } from './gameLogic.js';
import { userInput, repeatBtn, nextBtn, newGameBtn } from './main.js';
import { keyboardState } from './keyboardState.js';

function showRoundLost() {
    setTimeout(() => {
        userInput.value = 'You are mistaken!';
    }, 300);
    keyboardState.disableKeyboard();
}

function showRoundWon() {
    setTimeout(() => {
        userInput.value = 'Good game!';
    }, 300);
    visibilityHandler.makeHidden(repeatBtn);
    visibilityHandler.makeVisible(nextBtn);
    if (gameState.isLastRound()) {
        nextBtn.disabled = 'true';
        newGameBtn.focus();
    } else {
        nextBtn.focus();
    }
    keyboardState.disableKeyboard();
}

function showRoundRepeat() {
    repeatBtn.focus();
}

function disableRoundRepeat() {
    repeatBtn.disabled = 'true';
    newGameBtn.focus();
}

function showGameLost() {
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

function keyboardClickHandler(userInputValue) {

    if(keyboardState.isKeyboardDisabled) {
        return;
    }

    gameState.makeTurn(userInputValue);

    userInput.value = gameState.playerInput.join('');
    if (gameState.isRoundWon()) {
        showRoundWon();
    }

    if (gameState.isTurnLost()) {
        showRoundLost();
        if (gameState.isRoundRepeatAvailable()) {
            showRoundRepeat();
        } else {
            showGameLost();
        }
    }
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

export function eventListenersForKeyboard() {
    const keyboard = Array.from(
        document.getElementsByClassName('game__keyboard-item')
    );

    keyboard.forEach((button) => {
        button.addEventListener('click', (event) => {
            keyboardClickHandler(event.target.getAttribute('data-key'));
        });
    });
}

export function documentKeydownHandler() {
    document.addEventListener('keydown', (event) => {
        event.preventDefault();
        if(keyboardState.isKeyboardDisabled) {
            return;
        }
        const keyboard = Array.from(
            document.getElementsByClassName('game__keyboard-item')
        );
        keyboard.forEach((button) => {
            if (button.getAttribute('data-key') === event.key.toLowerCase()) {
                button.click();
                buttonHighlighter(button);
            }
        });
    });
}
