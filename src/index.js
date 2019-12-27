import Game from './Game';
import { InputHandler } from './Handlers/InputHandler';
import { Player } from './GameObjects/Player';
import Terrain from './GameObjects/Terrain';
import { CameraHandler } from './Handlers/CameraHandler';
import { Scene } from './Scene';

let game;
let inputHandler;
let cameraHandler;

window.onload = () => {
    // init the scene
    cameraHandler = new CameraHandler();
    inputHandler = new InputHandler();
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
};

window.onkeyup = (event) => {
    if (event.key == ' ') {
        inputHandler.holdingShiftKey(false);
    }
};