import { gameState } from './gameDescription.js';

//создание элемента с классами
export function createElementWithClass(tag, classNames = []) {
    const element = document.createElement(tag);
    classNames.forEach((name) => element.classList.add(name));

    return element;
}

//перемешевание массива перед рендерингом
export function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}

//добавить/удалить класс hidden
export const visibilityHandler = {
    makeHidden(element) {
        element.classList.add('hidden');
    },
    
    makeVisible(element) {
        element.classList.remove('hidden');
    }
}

export const userInputHandler = {
    enableBlock() {
        document.addEventListener('keydown', preventKeyDown);
        const enablingBlock = document.getElementById('pointer-events-none');
        enablingBlock.classList.remove('hidden');
        document.body.style.pointerEvents = 'none';
        document.getElementById('game__btn_sequence').disabled = 'true';
        document.getElementById('game__btn_new').disabled = 'true';
    },
    
    disableBlock() {
        document.removeEventListener('keydown', preventKeyDown);
        const enablingBlock = document.getElementById('pointer-events-none');
        enablingBlock.classList.add('hidden');
        document.body.style.pointerEvents = 'auto';
        document.getElementById('game__btn_new').disabled = '';
        if (gameState.playingTimes < 2) {
            document.getElementById('game__btn_sequence').disabled = '';
        }
        document.getElementById('game__user-input').focus();
    }
}

// Функция для предотвращения ввода с клавиатуры
function preventKeyDown(event) {
    event.preventDefault();
    event.stopPropagation();
}