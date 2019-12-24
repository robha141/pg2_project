import Game from './Game';

let game;

window.onload = () => {
    // init the scene
    game = new Game();
    game.initialSetup();
    game.startRenderLoop();
};

window.onmousedown = (event) => {
    game.inputHandler.holdingMouse(true);
    game.inputHandler.updateMouse(event, game.renderer);
};

window.onmouseup = (event) => {
    game.inputHandler.holdingMouse(false);
    game.inputHandler.updateMouse(event, game.renderer);
};

window.onmousemove = (event) => {
    if (game.inputHandler.mouseDown) {
        game.inputHandler.updateMouse(event, game.renderer);
    }
};

window.onkeydown = (event) => {
    if (event.key == 'Shift') {
        game.inputHandler.holdingShiftKey(true);
    }
};

window.onkeyup = (event) => {
    if (event.key == 'Shift') {
        game.inputHandler.holdingShiftKey(false);
    }
};