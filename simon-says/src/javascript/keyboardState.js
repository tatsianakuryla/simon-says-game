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
        return Array.from(document.getElementsByClassName('game__keyboard-item'));
    },

    isKeyboardDisabled: true,
    isKeyProcessing: false,

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
        if (this.isKeyboardDisabled || this.isKeyProcessing) {
            return;
        }

        this.isKeyProcessing = true;
        gameState.makeTurn(userInputValue);
        userInput.value = gameState.playerInput.join('');
        if (gameState.isRoundWon()) {
            showRoundWon();
        };

        if (gameState.isTurnLost()) {
            showRoundLost();
            if (gameState.isRoundRepeatAvailable()) {
                showRoundRepeat();
            } else {
                showGameLost();
            }
        };
        setTimeout(() => {
            this.isKeyProcessing = false;
        }, 100);
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
            if (this.isKeyboardDisabled || this.isKeyProcessing) {
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
