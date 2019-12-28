import * as THREE from "three";
import { GameObject } from "./GameObject";

export const TERRAIN_WIDTH = 500;
export const TERRAIN_LENGTH = 500;

export default class Terrain extends GameObject {
    onSetup() {
        let terrain = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(
                TERRAIN_WIDTH, 
                TERRAIN_LENGTH
            ), 
            new THREE.MeshPhongMaterial({ color: 0xffffff, depthWrite: false })
        );
        terrain.rotation.x = - Math.PI / 2;
        this.sceneObject = terrain;
        // Grid
        var grid = new THREE.GridHelper(
            TERRAIN_LENGTH, 
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