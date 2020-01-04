import { INPUT_COLORS } from "./Input/ColorHandler";
import { SCORE_TYPE } from "./Score/Score";

export class UiHandler {
    constructor() {
        // Bottom color indicators
        this.firstCircle = document.getElementById("firstCircle");
        this.secondCircle = document.getElementById("secondCircle");
        this.thirdCircle = document.getElementById("thirdCircle");
        // Top controls
        this.pauseButton = document.getElementById("pause");
        this.scoreText = document.getElementById("score");
        this.healthText = document.getElementById("health");
        // Popups
        this.gameOverPopup = document.getElementById("gameOverPopup");
        this.scoreValue = document.getElementById("scoreValue");
        this.oldHighscoreValue = document.getElementById("oldHighscoreValue");
        this.gameOverHighScorePopup = document.getElementById("gameOverHighScorePopup");
        this.newHighscoreValue = document.getElementById("newHighscoreValue");
    }

    getPlayAgainButtons() {
        return document.getElementsByClassName("customButton bordered playAgain");
    }

    // Bottom color indicators

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

    // Top controls

    updatePause(paused) {
        this.pauseButton.textContent = paused ? 'Play' : 'Pause';
    }

    updateScore(score) {
        this.scoreText.innerText = `Score: ${score}`;
    }

    updateHealth(health) {
        this.healthText.innerText = `Health: ${health}`;
    }

    // Score popups

    showScorePopup(score) {
        console.log(score);
        switch (score.type) {
        case SCORE_TYPE.HIGHSCORE:
            this.newHighscoreValue.innerText = score.value;
            this.gameOverHighScorePopup.style.display = 'flex';           
            break;
        case SCORE_TYPE.NORMALSCORE:
            this.scoreValue.innerText = score.value;
            this.oldHighscoreValue.innerText = score.oldValue;
            this.gameOverPopup.style.display = 'flex';
            break;
        }
    }

    hideScorePopup() {
        this.gameOverPopup.style.display = 'none';
        this.gameOverHighScorePopup.style.display = 'none';
    }
}