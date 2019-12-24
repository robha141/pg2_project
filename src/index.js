import Game from './Game';

let game;

window.onload = () => {
    // init the scene
    game = new Game();
    game.initialSetup();
    game.startRenderLoop();
};

window.onmousedown = () => {
    console.log('Click');
};