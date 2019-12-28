import { INPUT_COLORS } from "./Input/ColorHandler";

export class UiHandler {
    constructor() {
        this.firstCircle = document.getElementById("firstCircle");
        this.secondCircle = document.getElementById("secondCircle");
        this.thirdCircle = document.getElementById("thirdCircle");
    }

    updateColors(colors) {
        this.updateColor(colors[0], this.firstCircle);
        this.updateColor(colors[1], this.secondCircle);
        this.updateColor(colors[2], this.thirdCircle);
    }

    updateColor(color, element) {
        switch (color) {
        case INPUT_COLORS.RED:
            element.style.background = 'red';
            break;
        case INPUT_COLORS.GREEN:
            element.style.background = 'green';
            break;
        case INPUT_COLORS.BLUE:
            element.style.background = 'blue';
            break;
        }
    }
}