import * as THREE from "three";
import { GameObject } from "./GameObjects/GameObject";

export default class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer();
        

        this.clock = new THREE.Clock();
        this.gameObjects = [];
    }

    // Setup

    initialSetup() {
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
        this.camera.position.x = 1;
        this.camera.position.y = 2;
        this.camera.position.z = 5;
        // After initial setup, animate is called to start render loop
        this.animate()
    }

    // Animation loop

    animate(time) {
        requestAnimationFrame(() => this.animate());
        const delta = this.clock.getDelta();
        this.gameObjects.forEach(object => {
            object.delta = delta;
            object.onRender();
        })
        this.renderer.render(this.scene, this.camera);
    }
}
