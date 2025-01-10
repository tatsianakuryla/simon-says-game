import { userInputHandler } from './helpers.js';
export const DIGITS = [
    {
        key: '1',
        code: 'Digit1',
    },
    {
        key: '2',
        code: 'Digit2',
    },
    {
        key: '3',
        code: 'Digit3',
    },
    {
        key: '4',
        code: 'Digit4',
    },
    {
        key: '5',
        code: 'Digit5',
    },
    {
        key: '6',
        code: 'Digit6',
    },
    {
        key: '7',
        code: 'Digit7',
    },
    {
        key: '8',
        code: 'Digit8',
    },
    {
        key: '9',
        code: 'Digit9',
    },
    {
        key: '0',
        code: 'Digit0',
    },
];

export const LETTERS = [
    {
        key: 'q',
        code: 'KeyQ',
    },
    {
        key: 'w',
        code: 'KeyW',
    },
    {
        key: 'e',
        code: 'KeyE',
    },
    {
        key: 'r',
        code: 'KeyR',
    },
    {
        key: 't',
        code: 'KeyT',
    },
    {
        key: 'y',
        code: 'KeyY',
    },
    {
        key: 'u',
        code: 'KeyU',
    },
    {
        key: 'i',
        code: 'KeyI',
    },
    {
        key: 'o',
        code: 'KeyO',
    },
    {
        key: 'p',
        code: 'KeyP',
    },
    {
        key: 'a',
        code: 'KeyA',
    },
    {
        key: 's',
        code: 'KeyS',
    },
    {
        key: 'd',
        code: 'KeyD',
    },
    {
        key: 'f',
        code: 'KeyF',
    },
    {
        key: 'g',
        code: 'KeyG',
    },
    {
        key: 'h',
        code: 'KeyH',
    },
    {
        key: 'j',
        code: 'KeyJ',
    },
    {
        key: 'k',
        code: 'KeyK',
    },
    {
        key: 'l',
        code: 'KeyL',
    },
    {
        key: 'z',
        code: 'KeyZ',
    },
    {
        key: 'x',
        code: 'KeyX',
    },
    {
        key: 'c',
        code: 'KeyC',
    },
    {
        key: 'v',
        code: 'KeyV',
    },
    {
        key: 'b',
        code: 'KeyB',
    },
    {
        key: 'n',
        code: 'KeyN',
    },
    {
        key: 'm',
        code: 'KeyM',
    },
];

export const LEVELS = ['easy', 'medium', 'hard'];

export const gameState = {
    difficulty: 'easy',
    roundCounter: 1,
    sequence: [],
    userInputValue: '',
    playingTimes: 0,
};

export function getSequence(roundCounter) {
    const keyboard = Array.from(
        document.getElementsByClassName('game__keyboard-item')
    );
    for (let i = 0; i < roundCounter * 2; i++) {
        gameState.sequence.push(Math.floor(Math.random() * keyboard.length));
    }
    gameState.sequence.forEach((input) => console.log(keyboard[input].innerText));
}

export function playSequence(sequence) {
    setTimeout(() => {
        userInputHandler.enableBlock();
        const keyboard = Array.from(
            document.getElementsByClassName('game__keyboard-item')
        );
        sequence.forEach((item, index) => {
            setTimeout(() => {
                keyboard[item].classList.add('active');

                setTimeout(() => {
                    keyboard[item].classList.remove('active');
                }, 400);
            }, 600 * index);
        });
        setTimeout(() => {
            userInputHandler.disableBlock();
        }, 600 * sequence.length);
        gameState.playingTimes++;
    }, 600);
}