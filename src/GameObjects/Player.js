import * as THREE from "three";
import { GameObject } from "./GameObject";
import { TERRAIN_OBJECT_NAME } from "./Terrain";
import { RaycastHandler } from "../Handlers/RaycastHanldler";

const PLAYER_SIZE = 20;
const PLAYER_SPEED = 3;
const PLAYER_OBJECT_NAME = 'Player';

export class Player extends GameObject {
    onSetup() {
        const OUTLINE_SIZE = PLAYER_SIZE * 0.05;
        this.PLAYER_Y = OUTLINE_SIZE + PLAYER_SIZE / 2;
        this.lookAt = new THREE.Vector3();
        this.moveTo = new THREE.Vector3();
        this.position = new THREE.Vector3(0, this.PLAYER_Y, 0);
        // Player
        let geometry = new THREE.BoxGeometry(
            PLAYER_SIZE, 
            PLAYER_SIZE, 
            PLAYER_SIZE
        );
        let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        let player = new THREE.Mesh(
            geometry, 
            material
        );
        player.position.x = this.position.x;
        player.position.y = this.position.y;
        player.position.z = this.position.z;
        this.addObjectToScene(player);
        player.name = PLAYER_OBJECT_NAME;
        // Outline
        let outlineGeometry = new THREE.BoxGeometry(
            PLAYER_SIZE + OUTLINE_SIZE, 
            PLAYER_SIZE + OUTLINE_SIZE, 
            PLAYER_SIZE + OUTLINE_SIZE
        );
        let outlineMaterial = new THREE.MeshBasicMaterial({ color : 0x0000000, side: THREE.BackSide });
        let playerOutline = new THREE.Mesh(
            outlineGeometry, 
            outlineMaterial
        );
        player.add(playerOutline);
    }

    onUpdate() {
        const terrain = this.getObjectByName(TERRAIN_OBJECT_NAME);
        if (this.playerIsShooting()) {
            // TODO: - shooting
            this.calculateRotation(this.getFirstIntersectionNames([terrain]));
        } else if (this.playerIsMoving()) {
            const point = this.getFirstIntersectionNames([terrain]);
            this.setNewPosition(point);
            this.calculateRotation(point);
        }
        this.calculateNewPosition();
        this.updatePlayerObject();
        this.getCameraHandler().updateCamera(this.position);
    }

    updatePlayerObject() {
        const player = this.getObjectByName(PLAYER_OBJECT_NAME);
        player.position.x = this.position.x;
        player.position.y = this.position.y;
        player.position.z = this.position.z;
        player.lookAt(this.lookAt.x, this.PLAYER_Y, this.lookAt.y);
    }

    // Player convience functions

    playerIsShooting() {
        return this.getInputHandler().mouseDown 
            && this.getInputHandler().shiftDown
    }

    playerIsMoving() {
        return this.getInputHandler().mouseDown
    }

    // Position and movement

    setNewPosition(newPosition) {
        if (newPosition == null) {
            return
        }
        this.moveTo.x = newPosition.x;
        this.moveTo.z = newPosition.z;
    }

    calculateRotation(newPosition) {
        if (newPosition == null) {
            return
        }
        const currentPos = new THREE.Vector3(this.position.x, 0, this.position.z);
        this.lookAt.subVectors(newPosition, currentPos).normalize();
        this.lookAt.x += newPosition.x;
        this.lookAt.y += newPosition.z;
    }

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
        this.position.x = this.position.x + (PLAYER_SPEED * (diffX / distance)) * multiplierX;
        this.position.z = this.position.z + (PLAYER_SPEED * (diffZ / distance)) * multiplierZ;
    }

    // Shooting

    shoot() {
        console.log('Fire!');
    }
}