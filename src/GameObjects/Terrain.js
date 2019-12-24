import * as THREE from "three";
import GameObject from "./GameObject";

export default class Terrain extends GameObject {
    onSetup(scene) {
        let mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(500,500), 
            new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
        );
        mesh.rotation.x = - Math.PI / 2;
        scene.add( mesh );
        var grid = new THREE.GridHelper( 500, 100, 0x000000, 0x000000 );
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        scene.add( grid );
    }
}