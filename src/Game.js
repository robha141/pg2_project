import * as THREE from "three";
import { Scene } from "./Scene";
import { Player } from "./GameObjects/Player";
import Terrain from "./GameObjects/Terrain";
import { RaycastHandler } from "./Handlers/RaycastHanldler";
import { Enemy } from "./GameObjects/Enemy/Enemy";

export default class Game {
    constructor(inputHandler, cameraHandler) {
        this.inputHandler = inputHandler;
        this.cameraHandler = cameraHandler;
        this.scene = new Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.raycastHandler = new RaycastHandler(inputHandler, cameraHandler);
        this.objects = [];
    }

    // Setup

    initialSetup() {
        
        const terrain = new Terrain(this);
        terrain.addToGame();
        const player = new Player(this);
        player.addToGame();
        const enemy = new Enemy(
            this, 
            new THREE.Color(0xff0000),
            new THREE.Vector3(50, 0, 50)
        );
        enemy.addToGame();
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

    /**
     * Called automatically in constructor when creating subclass of GameObject.
     */
    addGameObject(object) {
        console.log(object);
        object.onSetup();
        this.objects.push(object);
    }

    removeGameObject(object) {
        const index = this.objects.indexOf(object);
        if (index > -1) {
            this.objects.splice(index, 1);
        }
    }

    getPlayer() {
        return this.objects[1];
    }

    getTerrain() {
        return this.objects[0];
    }
}
