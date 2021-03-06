import * as THREE from "three";

export class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        // Skybox (currently just background)
        this.scene.background = new THREE.Color(0x000000);
        // Light
        var light = new THREE.HemisphereLight(
            0xffffff, 
            0x444444
        );
        light.position.set( 0, 20, 0 );
        this.scene.add( light );
        light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 0, 20, 10 );
        this.scene.add( light );
    }

    add(object) {
        this.scene.add(object);
    }

    remove(object) {
        this.scene.remove(object);
    }
}