import { GameObject } from "../GameObject";
import * as THREE from "three";

const BULLET_SPEED = 5;
const BULLET_RADIUS = 3;

export class Bullet extends GameObject {
    constructor(game, color, quaternion, startPosition) {
        super(game);
        this.clock = new THREE.Clock();
        const geometry = new THREE.SphereGeometry(
            BULLET_RADIUS, 
            6, 
            6
        );
        const material = new THREE.MeshBasicMaterial({ color: color });
        const bullet = new THREE.Mesh(geometry, material);
        bullet.position.x = startPosition.x;
        bullet.position.y = startPosition.y;
        bullet.position.z = startPosition.z;
        bullet.applyQuaternion(quaternion);
        this.sceneObject = bullet;
        // Outline
        const OUTLINE_SIZE = BULLET_RADIUS * 0.05;
        const outlineGeometry = new THREE.SphereGeometry(
            BULLET_RADIUS + OUTLINE_SIZE, 
            6, 
            6
        );
        let outlineMaterial = new THREE.MeshBasicMaterial({ color : 0x0000000, side: THREE.BackSide });
        let bulletOutline = new THREE.Mesh(
            outlineGeometry, 
            outlineMaterial
        );
        bullet.add(bulletOutline);
    }

    onUpdate() {
        this.sceneObject.translateZ(BULLET_SPEED);
        if (this.clock.getElapsedTime() >= 1) {
            this.removeFromSceneAndGame();
        }
    }
}