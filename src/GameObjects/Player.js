import * as THREE from "three";
import { GameObjectModel } from "./GameObjectModel";

export class Player extends GameObjectModel {
    constructor(scene) {
        super('Player');
        this.angle = 0;
        this.lookAt = new THREE.Vector3();
        this.moveTo = new THREE.Vector3();
        this.position = new THREE.Vector3();
        this.speed = 3;

        const playerSize = 20;
        const outlineSize = playerSize * 0.05;

        let geometry = new THREE.BoxGeometry(
            playerSize, 
            playerSize, 
            playerSize
        );
        let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
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

    setNewPosition(newPosition) {
        this.moveTo.x = newPosition.x;
        this.moveTo.z = newPosition.z;
    }

    calculateAngle(newPosition) {
        const currentPos = new THREE.Vector3(this.position.x, 0, this.position.z);
        this.lookAt.subVectors(newPosition, currentPos).normalize();
        this.lookAt.x += newPosition.x;
        this.lookAt.y += newPosition.z;
    }

    // Calculating new position according tutorial from http://bryanjones.us/article/basic-threejs-game-tutorial-part-3-moving
    calculateNewPosition() {
        const posX = this.position.x;
        const posZ = this.position.z;
        const newPosX = this.moveTo.x;
        const newPosZ = this.moveTo.z;

        if ((Math.floor(this.position.x) <= Math.floor(newPosX) + 1.5 && 
            Math.floor(this.position.x) >= Math.floor(newPosX) - 1.5) &&
            (Math.floor(this.position.z) <= Math.floor(newPosZ) + 1.5 && 
            Math.floor(this.position.z) >= Math.floor(newPosZ) - 1.5)) {
            return
        }

        let multiplierX = 1;
        let multiplierZ = 1;

        const diffX = Math.abs( posX - newPosX );
        const diffZ = Math.abs( posZ - newPosZ );
        const distance = Math.sqrt( diffX * diffX + diffZ * diffZ );

        if (posX > newPosX) {
            multiplierX = -1;
        }
        if (posZ > newPosZ) {
            multiplierZ = -1;
        }

        this.position.x = this.position.x + (this.speed * (diffX / distance)) * multiplierX;
        this.position.z = this.position.z + (this.speed * (diffZ / distance)) * multiplierZ;
    }
}