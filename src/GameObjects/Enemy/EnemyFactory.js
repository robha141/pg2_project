import { TERRAIN_SIZE, TERRAIN_SIDES } from "../Terrain";
import * as THREE from "three";
import { ColorHandler } from "../../Handlers/Input/ColorHandler";
import { getRandomInt } from "../../Utils";
import { Enemy } from "./Enemy";


export class EnemyFactory {
    constructor(game) {
        this.game = game;
        this.colorHandler = new ColorHandler();
    }

    makeEnemy() {
        const spawnLocation = this.calculateSpawnLocation();
        this.colorHandler.generateRandomColor();
        const enemy = new Enemy(
            this.game, 
            this.colorHandler.getColor(), 
            spawnLocation
        );
        enemy.addToGame();
    }

    // Spawn position calcluateion

    calculateSpawnLocation() {
        let x = 0;
        let z = 0;
        let side = getRandomInt(0, 3);
        const HALF_SIZE = TERRAIN_SIZE / 2;
        switch (side) {
        case TERRAIN_SIDES.N:
            x = getRandomInt(-HALF_SIZE, HALF_SIZE);
            z = HALF_SIZE;
            break;
        case TERRAIN_SIDES.S:
            x = getRandomInt(-HALF_SIZE, HALF_SIZE);
            z = -HALF_SIZE;
            break;
        case TERRAIN_SIDES.E:
            x = HALF_SIZE;
            z = getRandomInt(-HALF_SIZE, HALF_SIZE);
            break;
        case TERRAIN_SIDES.W:
            x = -HALF_SIZE;
            z = getRandomInt(-HALF_SIZE, HALF_SIZE);
            break;
        }
        return new THREE.Vector3(x, 0, z);
    }
}