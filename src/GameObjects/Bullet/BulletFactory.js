import { Bullet } from "./Bullet";
import * as THREE from "three";

export class BulletFactory {
    constructor(player) {
        this.player = player;
    }

    makeBullet() {
        const colorHex = this.player.getInputHandler().colorHandler.hexColor;
        const bullet = new Bullet(
            this.player.game, 
            new THREE.Color(colorHex), 
            this.player.sceneObject.quaternion, 
            this.player.position
        );
        bullet.addToGame();
    }
}