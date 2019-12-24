import * as THREE from "three";
import Terrain from "./GameObjects/Terrain";

export default class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 
            100, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.renderer = new THREE.WebGLRenderer();
        this.clock = new THREE.Clock();

        this.gameObjects = [];
        this.terrain = new Terrain();
    }

    // Setup

    initialSetup() {
        this.setupGameObjects()

        // Skybox (currently just background)

        this.scene.background = new THREE.Color(0xbfd1e5);

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

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        // Camera pos

        this.camera.position.x = 0;
        this.camera.position.y = 100;
        this.camera.position.z = 50;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    setupGameObjects() {
        this.gameObjects.push(this.terrain);
        this.gameObjects.forEach((object) => {
            object.onSetup(this.scene);
        });
    }

    // Render loop

    startRenderLoop() {
        this.render()
    }

    render(time) {
        requestAnimationFrame(() => this.render());
        const delta = this.clock.getDelta();
        this.gameObjects.forEach(object => {
            object.delta = delta;
            object.onRender();
        })
        this.renderer.render(this.scene, this.camera);
    }
}
