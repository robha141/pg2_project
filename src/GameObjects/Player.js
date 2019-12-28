import * as THREE from "three";
import { GameObject } from "./GameObject";
import { Bullet } from "./Bullet/Bullet";
import { BulletFactory } from "./Bullet/BulletFactory";

const PLAYER_SIZE = 20;
const PLAYER_SPEED = 3;
const SHOOTING_SPEED = 0.3;

// TODO
// - player rotation with quaternion
export class Player extends GameObject {
    onSetup() {
        this.bulletFactory = new BulletFactory(this);
        this.shootingClock = new THREE.Clock(false);
        this.shootingClock.start();
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
        let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        let player = new THREE.Mesh(
            geometry, 
            material
        );
        player.position.x = this.position.x;
        player.position.y = this.position.y;
        player.position.z = this.position.z;
        this.sceneObject = player;
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
        super.onSetup();
    }

    onUpdate() {
        const terrain = this.game.getTerrain();
        if (this.playerIsShooting()) {
            this.calculateRotation(terrain.getSceneObjectIntersection());
            this.setNewPosition(this.position);
            this.shoot();
        } else if (this.playerIsMoving()) {
            const point = terrain.getSceneObjectIntersection();
            this.setNewPosition(point);
            this.calculateRotation(point);
            this.stopShooting();
        } else {
            this.stopShooting();
        }
        this.calculateNewPosition();
        this.updatePlayerObject();
        this.getCameraHandler().updateCamera(this.position);
    }

    updatePlayerObject() {
        this.sceneObject.position.x = this.position.x;
        this.sceneObject.position.y = this.position.y;
        this.sceneObject.position.z = this.position.z;
        this.sceneObject.lookAt(this.lookAt.x, this.PLAYER_Y, this.lookAt.y);
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
        if (!this.shootingClock.running ||
            this.shootingClock.getElapsedTime() >= SHOOTING_SPEED) {
            this.shootingClock.start();
            this.bulletFactory.makeBullet();
        }
    }

    stopShooting() {
        this.shootingClock.stop();
    }
}