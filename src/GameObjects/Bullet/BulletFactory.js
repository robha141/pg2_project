import { Bullet } from "./Bullet";
import * as THREE from "three";

export class BulletFactory {
    constructor(player) {
        this.player = player;
    }

    makeBullet() {
        const game = this.player.game;
        const inputHandler = this.player.inputHandler;
        const color = new THREE.Color(0xff0000);
        const bullet = new Bullet(
            game, 
            color, 
            this.player.sceneObject.quaternion, 
            this.player.position
        );
        bullet.addToGame();
    }
}