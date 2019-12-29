import * as THREE from "three";
import { GameObject } from "./GameObject";

export const TERRAIN_SIZE = 500;
export const TERRAIN_SIDES = {
    N: 0,
    S: 1,
    W: 2,
    E: 3
}

export default class Terrain extends GameObject {
    onSetup() {
        let terrain = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(
                TERRAIN_SIZE, 
                TERRAIN_SIZE
            ), 
            new THREE.MeshPhongMaterial({ color: 0xffffff, depthWrite: false })
        );
        terrain.rotation.x = - Math.PI / 2;
        this.sceneObject = terrain;
        // Grid
        var grid = new THREE.GridHelper(
            TERRAIN_SIZE, 
            40, 
            0x000000, 
            0x000000
        );
        grid.material.opacity = 0.4;
        grid.material.transparent = true;
        this.game.scene.add(grid);
        super.onSetup();
    }
}