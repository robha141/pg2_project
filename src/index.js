import Game from './Game';
import { InputHandler } from './Handlers/Input/InputHandler';
import { CameraHandler } from './Handlers/CameraHandler';
import { UiHandler } from './Handlers/UiHandler';

let game;
let inputHandler;
let cameraHandler;
let uiHandler;

window.onload = () => {
    // init the scene
    uiHandler = new UiHandler();
    cameraHandler = new CameraHandler();
    inputHandler = new InputHandler();
    uiHandler.updateColors(inputHandler.colorHandler.colors);
    game = new Game(inputHandler, cameraHandler);
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
    if (event.key == ' ') {
        inputHandler.holdingShiftKey(true);
    }
    inputHandler.colorHandler.handleInput(event.code);
    uiHandler.updateColors(inputHandler.colorHandler.colors);
};

window.onkeyup = (event) => {
    if (event.key == ' ') {
        inputHandler.holdingShiftKey(false);
    }
};