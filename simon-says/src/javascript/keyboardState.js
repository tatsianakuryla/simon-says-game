import { buttonHighlighter } from './helpers.js';
import { gameState } from './gameState.js';
import { userInput } from './main.js';
import {
    showRoundWon,
    showRoundLost,
    showRoundRepeat,
    showGameLost,
} from './showGameLogic.js';

export const keyboardState = {
    getKeyboard() {
        const keyboard = Array.from(
            document.getElementsByClassName('game__keyboard-item')
        );
        return keyboard;
    },

    isKeyboardDisabled: true,

    disableKeyboard() {
        this.isKeyboardDisabled = true;
        this.getKeyboard().forEach((btn) => {
            btn.style.pointerEvents = 'none';
        });
    },

    enableKeyboard() {
        this.isKeyboardDisabled = false;
        this.getKeyboard().forEach((btn) => {
            btn.style.pointerEvents = '';
        });
    },

    keyboardClickHandler(userInputValue) {
        if (this.isKeyboardDisabled) {
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
    },

    eventListenersForKeyboard() {
        this.getKeyboard().forEach((button) => {
            button.addEventListener('click', (event) => {
                this.keyboardClickHandler(
                    event.target.getAttribute('data-key')
                );
            });
        });
    },

    keyboardKeydownHandler() {
        document.addEventListener('keydown', (event) => {
            event.preventDefault();
            if (this.isKeyboardDisabled) {
                return;
            }
            this.getKeyboard().forEach((button) => {
                if (
                    button.getAttribute('data-key') === event.key.toLowerCase()
                ) {
                    button.click();
                    buttonHighlighter(button);
                }
            });
        });
    },
};
