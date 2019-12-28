
export const INPUT_COLORS = {
    RED: 0,
    GREEN: 2,
    BLUE: 4
}

/**
 * Handler class for selected color. Whenever users select new color, this class will automatically update it's contents.
 */
export class ColorHandler {
    constructor() {
        this.colors = [
            INPUT_COLORS.RED,
            INPUT_COLORS.GREEN,
            INPUT_COLORS.BLUE
        ];
        this.calculateNewColor();
    }

    handleInput(key) {
        switch(key) {
        case 'KeyQ':
            this.newColorSelected(INPUT_COLORS.RED);
            break;
        case 'KeyW':
            this.newColorSelected(INPUT_COLORS.GREEN);
            break;
        case 'KeyE':
            this.newColorSelected(INPUT_COLORS.BLUE);
            break;
        default:
            break;
        }
        this.calculateNewColor();
    }

    calculateNewColor() {
        let hexColorArray = ['0', '0', '0', '0', '0', '0'];
        this.colors.forEach(color => {
            if (hexColorArray[color] != 'f') {
                hexColorArray.splice(color, 1, 'f');
            } else if (hexColorArray[color + 1] != 'f') {
                hexColorArray.splice(color + 1, 1, 'f');
            }
        });
        hexColorArray.unshift('0x');
        this.hexColor = hexColorArray.join('');
    }

    newColorSelected(color) {
        this.colors.pop();
        this.colors.unshift(color);
    }
}