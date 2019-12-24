import * as THREE from "three";
import { GameObjectModel } from "./GameObjectModel";

export class Player extends GameObjectModel {
    constructor(scene) {
        super('Player');
        this.position = new THREE.Vector3(0, 0, 0);
        const playerSize = 20;
        const outlineSize = playerSize * 0.05;

        let geometry = new THREE.BoxGeometry(
            playerSize, 
            playerSize, 
            playerSize
        );
        let material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        let player = new THREE.Mesh(
            geometry, 
            material
        );
        player.position.x = this.position.x;
        player.position.y = this.position.y;
        player.position.z = this.position.z;
        scene.add(player);
        player.name = this.name;

        let outlineGeometry = new THREE.BoxGeometry(
            playerSize + outlineSize, 
            playerSize + outlineSize, 
            playerSize + outlineSize
        );
        let outlineMaterial = new THREE.MeshBasicMaterial({ color : 0x0000000, side: THREE.BackSide });
        let playerOutline = new THREE.Mesh(
            outlineGeometry, 
            outlineMaterial
        );
        player.add(playerOutline);
    }

    calculateNewPosition(newPosition) {
        this.position.x = newPosition.x;
        this.position.z = newPosition.z;
    }
}