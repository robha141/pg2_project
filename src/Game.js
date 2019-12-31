import * as THREE from "three";
import { Scene } from "./Scene";
import { Player } from "./GameObjects/Player";
import Terrain from "./GameObjects/Terrain";
import { RaycastHandler } from "./Handlers/RaycastHanldler";
import { EnemyFactory } from "./GameObjects/Enemy/EnemyFactory";
import { ScoreHandler } from "./Handlers/ScoreHandler";

// TODO
// spawning in different class.
export default class Game {
    constructor(inputHandler, cameraHandler, uiHandler) {
        this.isPaused = false;
        this.uiHandler = uiHandler;
        this.inputHandler = inputHandler;
        this.cameraHandler = cameraHandler;
        this.scene = new Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.raycastHandler = new RaycastHandler(inputHandler, cameraHandler);
        this.objects = [];
        this.enemyFactory = new EnemyFactory(this);
        this.scoreHanlder = new ScoreHandler();
    }

    // Setup

    initialSetup() {
        const terrain = new Terrain(this);
        terrain.addToGame();
        const player = new Player(this);
        player.addToGame();
        this.resize();
        this.uiHandler.updateHealth(player.health);
        this.uiHandler.updateScore(this.scoreHanlder.score);
        document.body.appendChild( this.renderer.domElement );
    }

    resize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Game loop

    startGame() {
        this.isPaused = false;
        this.render();
        this.enemyFactory.makeEnemy();
        this.enemySpawn = setInterval(() => {
            this.enemyFactory.makeEnemy();
        }, 2500);
    }

    pauseGame() {
        this.isPaused = true;
        clearInterval(this.enemySpawn);
    }

    restart() {
        this.pauseGame();
        while (this.objects && this.objects.length) {
            let object = this.objects.pop();
            object.removeSceneObject();
        }
        const terrain = new Terrain(this);
        terrain.addToGame();
        const player = new Player(this);
        player.addToGame();
    }

    render() {
        if (this.isPaused) { return; }
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

    // Score

    enemyKill() {
        this.scoreHanlder.enemyKill();
        this.uiHandler.updateScore(this.scoreHanlder.score);
    }

    collisonWithEnemy() {
        this.scoreHanlder.resetUninterauptedKillCount();
        this.uiHandler.updateHealth(this.getPlayer().health);
    }
}
