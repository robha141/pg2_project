import { INPUT_COLORS } from "./Input/ColorHandler";

export class UiHandler {
    constructor() {
        this.firstCircle = document.getElementById("firstCircle");
        this.secondCircle = document.getElementById("secondCircle");
        this.thirdCircle = document.getElementById("thirdCircle");
        this.pauseButton = document.getElementById("pause");
        this.scoreText = document.getElementById("score");
        this.healthText = document.getElementById("health");
        this.gameOverPopup = document.getElementById("gameOverPopup");
    }

    // Return elements

    getPlayAgainButtons() {
        return document.getElementsByClassName("customButton bordered playAgain");
    }

    // Updates

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

    updatePause(paused) {
        this.pauseButton.textContent = paused ? 'Play' : 'Pause';
    }

    updateScore(score) {
        this.scoreText.innerText = 'Score: ' + score;
    }

    updateHealth(health) {
        this.healthText.innerText = 'Health: ' + health;
    }

    toggleGameOverPopup(hidden) {
        this.gameOverPopup.style.display = hidden ? 'none' : 'flex';
    }
}