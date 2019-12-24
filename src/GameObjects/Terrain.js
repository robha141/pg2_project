import * as THREE from "three";
import { GameObjectModel } from "./GameObjectModel";

export default class Terrain extends GameObjectModel {
    constructor(scene) {
        super('Terrain');
        let mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(500,500), 
            new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
        );
        mesh.rotation.x = - Math.PI / 2;
        scene.add( mesh );
        mesh.name = this.name;
    }
}