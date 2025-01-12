export const keyboardState  = {
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
    }
}