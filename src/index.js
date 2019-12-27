import Game from './Game';
import { InputHandler } from './Handlers/InputHandler';
import { CameraHandler } from './Handlers/CameraHandler';

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
    var x = document.getElementById("firstCircle");
    x.style.background = "red";
    var y = document.getElementById("secondCircle");
    y.style.background = "green";
    var z = document.getElementById("thirdCircle");
    z.style.background = "blue";
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