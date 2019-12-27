import * as THREE from "three";
import { Scene } from "./Scene";
import { Player } from "./GameObjects/Player";
import Terrain from "./GameObjects/Terrain";
import { RaycastHandler } from "./Handlers/RaycastHanldler";

export default class Game {
    constructor(inputHandler, cameraHandler) {
        this.inputHandler = inputHandler;
        this.cameraHandler = cameraHandler;
        this.scene = new Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.raycastHandler = new RaycastHandler(inputHandler, cameraHandler);
        this.objects = [
            new Player(this),
            new Terrain(this)
        ];
    }

    // Setup

    initialSetup() {
        this.objects.forEach(object => object.onSetup());
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild( this.renderer.domElement );
    }

    // Render loop

    startGame() {
        this.render()
    }

    pauseGame() {
        // TODO: - pause current game
    }

    render(time) {
        requestAnimationFrame(() => this.render());
        this.objects.forEach(object => object.onUpdate());
        this.renderer.render(this.scene.scene, this.cameraHandler.camera);
    }

    // Game object management

    addGameObject(object) {
        object.onSetup();
        this.objects.push(object);
    }
}
