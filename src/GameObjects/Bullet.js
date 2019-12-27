import { GameObject } from "./GameObject";
import * as THREE from "three";

const BULLET_SPEED = 1;
const BULLET_RADIUS = 2;

export class Bullet extends GameObject {
    constructor(game, color, direction, startPosition) {
        super(game);
        this.color = color;
        this.direction = direction;
        this.startPosition = startPosition;
    }

    onSetup() {
        const geometry = new THREE.SphereGeometry(
            BULLET_RADIUS, 
            32, 
            32
        );
        const material = new THREE.MeshBasicMaterial({ color: this.color.getHex() });
        const bullet = new THREE.Mesh(geometry, material);
        bullet.position.x = this.startPosition.x;
        bullet.position.y = this.startPosition.y;
        bullet.position.z = this.startPosition.z;
        this.addObjectToScene(bullet);
    }

    onUpdate() {

    }
}