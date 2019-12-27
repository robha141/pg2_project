import * as THREE from "three";
import { GameObject } from "./GameObject";

export const TERRAIN_WIDTH = 500;
export const TERRAIN_LENGTH = 500;
export const TERRAIN_OBJECT_NAME = 'Terrain';

export default class Terrain extends GameObject {
    onSetup() {
        let terrain = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(
                TERRAIN_WIDTH, 
                TERRAIN_LENGTH
            ), 
            new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
        );
        terrain.rotation.x = - Math.PI / 2;
        terrain.name = TERRAIN_OBJECT_NAME;
        this.addObjectToScene(terrain);
    }
}