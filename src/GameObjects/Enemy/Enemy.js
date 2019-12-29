import { GameObject } from "../GameObject";
import * as THREE from "three";

const ENEMY_SIZE = 15;
const ENEMY_SPEED = 1;

export class Enemy extends GameObject {
    constructor(game, color, spawnLocation) {
        super(game);
        // Enemy
        const geometry = new THREE.DodecahedronBufferGeometry(ENEMY_SIZE);
        geometry.computeBoundingBox();
        const material = new THREE.MeshBasicMaterial({ color: color });
        const enemy = new THREE.Mesh(geometry, material);
        this.sceneObject = enemy;
        // Outline
        const OUTLINE_SIZE = ENEMY_SIZE * 0.1;
        var outlineGeometry = new THREE.DodecahedronGeometry(ENEMY_SIZE + OUTLINE_SIZE);
        var outlineMaterial = new THREE.MeshBasicMaterial({
            color : 0x000000, 
            side: THREE.BackSide
        });
        var outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
        enemy.add(outline);
        // Position
        enemy.position.x = spawnLocation.x;
        enemy.position.y = ENEMY_SIZE / 2 + OUTLINE_SIZE;
        enemy.position.z = spawnLocation.z;
    }

    onUpdate() {
        this.updateBoundingBox();
        const playerPosition = this.game.getPlayer().position;
        this.sceneObject.lookAt(playerPosition);
        this.sceneObject.translateZ(ENEMY_SPEED);
    }
}