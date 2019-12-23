// import Triangle from './Triangle';
import BlackHole from './BlackHole';
import * as THREE from "three";
import * as TWEEN from "tween.js";

export default class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.camera.position.x = 1;
        this.camera.position.y = 2;
        this.camera.position.z = 5;

        // this.triangle = new Triangle(this.gl);
        this.blackHole = new BlackHole(this.scene);
    }

    animate(time) {
        requestAnimationFrame(() => this.animate());
        TWEEN.update(time);
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        this.animate();
    }

    startRotation() {
        this.blackHole.startRotation();
    }

    stopRotation() {
        this.blackHole.stopRotation();
    }

    showTexture() {
        this.blackHole.showTexture();
    }

    hideTexture() {
        this.blackHole.hideTexture();
    }
}
