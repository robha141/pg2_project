import { Bullet } from "./Bullet";
import * as THREE from "three";

export class BulletFactory {
    constructor(player) {
        this.player = player;
    }

    makeBullet() {
        const bullet = new Bullet(
            this.player.game, 
            this.player.getInputHandler().colorHandler.getColor(), 
            this.player.sceneObject.quaternion, 
            this.player.position
        );
        bullet.addToGame();
    }
}