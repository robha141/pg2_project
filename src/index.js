import Game from './Game';
import { InputHandler } from './Handlers/Input/InputHandler';
import { CameraHandler } from './Handlers/CameraHandler';
import { UiHandler } from './Handlers/UiHandler';

let game;
let inputHandler;
let uiHandler;

window.onresize = () => {
    game.resize();
}

window.onload = () => {
    uiHandler = new UiHandler();
    const cameraHandler = new CameraHandler();
    inputHandler = new InputHandler();
    uiHandler.updateColors(inputHandler.colorHandler.colors);
    setupTaps();
    game = new Game(inputHandler, cameraHandler, uiHandler);
    game.initialSetup();
    game.startGame();
};

window.onmousedown = (event) => {
    inputHandler.holdingMouse(true);
    inputHandler.updateMouse(event, game.renderer);
};

window.onmouseup = (event) => {
    inputHandler.holdingMouse(false);
    inputHandler.updateMouse(event, game.renderer);
};

window.onmousemove = (event) => {
    if (inputHandler.mouseDown) {
        inputHandler.updateMouse(event, game.renderer);
    }
};

window.onkeydown = (event) => {
    if (game.isPaused) { return; }
    if (event.key == 'Shift') { inputHandler.holdingShiftKey(true); }
    inputHandler.colorHandler.handleInput(event.code);
    uiHandler.updateColors(inputHandler.colorHandler.colors);
    game.getPlayer().changeColor();
};

window.onkeyup = (event) => {
    if (event.key == 'Shift') { inputHandler.holdingShiftKey(false); }
};

function setupTaps() {
    uiHandler.pauseButton.addEventListener('click', () => {
        game.isPaused ? game.startGame() : game.pauseGame();
    });
    const playAgainButtons = uiHandler.getPlayAgainButtons();
    for (let i = 0; i < playAgainButtons.length; i++) {
        playAgainButtons[i].addEventListener('click', () => {
            game.restart();
        });
    }
}