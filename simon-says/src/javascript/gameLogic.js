import { shuffle } from './helpers.js';

export const DIGITS = '1234567890'.split('');
export const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
export const LEVELS = ['easy', 'medium', 'hard'];

export const gameState = {
    difficulty: 'easy',
    roundCounter: 1,
    roundCount: 5,
    sequence: [],
    roundRepeatsCount: 1,
    playerInput: [],
    keyboard: [],

    getCharactersSet() {
        if (this.difficulty === 'easy') {
            return DIGITS;
        }
        if (this.difficulty === 'medium') {
            return LETTERS;
        }
        if (this.difficulty === 'hard') {
            return [...LETTERS, ...DIGITS];
        }
    },

    initKeyboard() {
        this.keyboard = shuffle(this.getCharactersSet());
    },

    initSequence() {
        this.sequence = [];
        for (let i = 0; i < this.roundCounter * 2; i++) {
            let index = Math.floor(Math.random() * this.keyboard.length);
            this.sequence.push(this.keyboard[index]);
        }
        console.log(gameState.sequence);
    },

    newGame() {
        this.initKeyboard();
        this.initSequence();
        this.roundCounter = 1;
        this.roundRepeatsCount = 1;
        this.playerInput = [];
    },

    isRoundWon() {
        return (
            JSON.stringify(this.sequence) === JSON.stringify(this.playerInput)
        );
    },

    isTurnWon() {
        return (
            this.playerInput[this.playerInput.length - 1] ===
            this.sequence[this.playerInput.length - 1]
        );
    },

    isTurnLost() {
        return !this.isTurnWon();
    },

    makeTurn(value) {
        this.playerInput.push(value);
    },

    isRoundRepeatAvailable() {
        return this.roundRepeatsCount > 0;
    },

    isLastRound() {
        return this.roundCounter >= this.roundCount;
    },

    repeatRound() {
        this.roundRepeatsCount--;
        this.playerInput = [];
    },

    nextRound() {
        this.roundCounter++;
        this.initSequence();
        this.roundRepeatsCount = 1;
        this.playerInput = [];
    }
};
