import * as THREE from "three";
import { Scene } from "./Scene";
import { Player } from "./GameObjects/Player";
import Terrain from "./GameObjects/Terrain";
import { RaycastHandler } from "./Handlers/RaycastHanldler";
import { EnemyFactory } from "./GameObjects/Enemy/EnemyFactory";

// TODO
// spawning in different class.
export default class Game {
    constructor(inputHandler, cameraHandler) {
        this.isPaused = false;
        this.inputHandler = inputHandler;
        this.cameraHandler = cameraHandler;
        this.scene = new Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.raycastHandler = new RaycastHandler(inputHandler, cameraHandler);
        this.objects = [];
        this.enemyFactory = new EnemyFactory(this);
    }

    // Setup

    initialSetup() {
        const terrain = new Terrain(this);
        terrain.addToGame();
        const player = new Player(this);
        player.addToGame();
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild( this.renderer.domElement );
    }

    // Render loop

    startGame() {
        this.isPaused = false;
        this.render();
        this.enemySpawn = setInterval(() => {
            this.enemyFactory.makeEnemy();
            clearInterval(this.enemySpawn);
        }, 2500);
    }

    pauseGame() {
        this.isPaused = true;
        clearInterval(this.enemySpawn);
    }

    render() {
        if (this.isPaused) {
            return;
        }
        requestAnimationFrame(() => this.render());
        this.objects.forEach(object => object.onUpdate());
        this.renderer.render(this.scene.scene, this.cameraHandler.camera);
    }

    // Game object management

    /**
     * Called automatically in constructor when creating subclass of GameObject.
     */
    addGameObject(object) {
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

    getAllObjectsOfClass(className) {
        return this.objects.filter(object => object.constructor.name == className);
    }
}
