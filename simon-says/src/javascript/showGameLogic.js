import {
    visibilityHandler,
    userInputHandler,
    preventKeyDown,
} from './helpers.js';
import { gameState } from './gameLogic.js';
import { userInput, repeatBtn, nextBtn, newGameBtn } from './main.js';

function showRoundLost() {
    userInput.value = 'You are mistaken!';
    disableKeyboard();
}

function showRoundWon() {
    userInput.value = 'Good game!';
    visibilityHandler.makeHidden(repeatBtn);
    visibilityHandler.makeVisible(nextBtn);
    if (gameState.isLastRound()) {
        nextBtn.disabled = 'true';
        newGameBtn.focus();
    } else {
        nextBtn.focus();
    }
    disableKeyboard();
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

function disableKeyboard() {
    const keyboard = Array.from(
        document.getElementsByClassName('game__keyboard-item')
    );
    keyboard.forEach((btn) => (btn.style.pointerEvents = 'none'));
    document.addEventListener('keydown', preventKeyDown);
}

function enableKeyboard() {
    const keyboard = Array.from(
        document.getElementsByClassName('game__keyboard-item')
    );
    keyboard.forEach((btn) => (btn.style.pointerEvents = ''));
    document.removeEventListener('keydown', preventKeyDown);
}

function keyboardClickHandler(userInputValue) {
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
                foundButton.classList.add('active');
                setTimeout(() => {
                    foundButton.classList.remove('active');
                }, 400);
            }, 600 * index);
        });
        setTimeout(() => {
            userInputHandler.disableBlock();
            enableKeyboard();
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
        const keyboard = Array.from(
            document.getElementsByClassName('game__keyboard-item')
        );
        keyboard.forEach((button) => {
            if (button.getAttribute('data-key') === event.key.toLowerCase()) {
                button.click();
            }
        });
    });
}
