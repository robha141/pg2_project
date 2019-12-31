import * as THREE from "three";

const ENEMY_SPEED_UPDATE = 0.3;
const BASE_ENEMY_SPEED = 0.5;
const UPDATE_THRESHOLD = 20;

export class DifficultyHandler {
    constructor() {
        this.clock = new THREE.Clock();
        this.currentEnemyMoveSpeed = BASE_ENEMY_SPEED;
    }

    resetCLock() {
        this.clock.stop();
        this.clock.start();
    }

    calculateEnemyMoveSpeed() {
        if (this.clock.getElapsedTime() > UPDATE_THRESHOLD) {
            this.resetCLock();
            this.currentEnemyMoveSpeed += ENEMY_SPEED_UPDATE;
        }
        return this.currentEnemyMoveSpeed;
    }
}