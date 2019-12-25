import * as THREE from "three";
import { GameObjectModel } from "./GameObjectModel";
import { UniformsUtils } from "three";
import * as UTILS from "../Utils";

export class Player extends GameObjectModel {
    constructor(scene) {
        super('Player');
        this.lookAt = new THREE.Vector3(0, 0, 1);
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
        var material = new THREE.MeshFaceMaterial([
            new THREE.MeshBasicMaterial({
                color: 0x00ff00
            }),
            new THREE.MeshBasicMaterial({
                color: 0xff0000
            }),
            new THREE.MeshBasicMaterial({
                color: 0x0000ff
            }),
            new THREE.MeshBasicMaterial({
                color: 0xf00000
            }),
            new THREE.MeshBasicMaterial({
                color: 0x00000f
            }),
            new THREE.MeshBasicMaterial({
                color: 0xf0000f
            })
        ]);
        // let material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
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


        player.rotateY(0.7853981634);
        // playerOutline.rotateY(0.7853981634);
    }

    setNewPosition(newPosition) {
        this.moveTo.x = newPosition.x;
        this.moveTo.z = newPosition.z;
        this.lookAt = newPosition;
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