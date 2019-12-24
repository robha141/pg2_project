import * as THREE from "three";
import Terrain from "./GameObjects/Terrain";
import { Player } from "./GameObjects/Player";
import { InputHandler } from "./InputHandler";
import { CameraHandler } from "./CameraHandler";

export default class Game {
    constructor() {
        // Three

        this.rayCaster = new THREE.Raycaster();
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();

        // Handlers

        this.inputHandler = new InputHandler();
        this.cameraHandler = new CameraHandler();

        // Objects
        
        this.intersectObjects = [];
        this.terrain = new Terrain(this.scene);
        this.player = new Player(this.scene);
    }

    // Setup

    initialSetup() {
        // Intersect objects
        this.intersectObjects.push(this.terrain.getAssociatedObject(this.scene));

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
    }

    // Render loop

    startRenderLoop() {
        this.render()
    }

    render(time) {
        requestAnimationFrame(() => this.render());
        this.updatePlayer();
        this.cameraHandler.updateCamera(this.player.position);
        this.renderer.render(this.scene, this.cameraHandler.camera);
    }

    updatePlayer() {
        if (this.inputHandler.mouseDown && this.inputHandler.shiftDown) {
            // TODO: - shooting
        } else if (this.inputHandler.mouseDown) {
            this.updatePlayerPosition();
        }
    }

    updatePlayerPosition() {
        this.rayCaster.setFromCamera(this.inputHandler.mouse, this.cameraHandler.camera);
        const intersects = this.rayCaster.intersectObjects(this.intersectObjects);
        if (intersects.length > 0) {
            this.player.calculateNewPosition(intersects[0].point);
        }
        this.player.getAssociatedObject(this.scene).position.x = this.player.position.x;
        this.player.getAssociatedObject(this.scene).position.y = this.player.position.y;
        this.player.getAssociatedObject(this.scene).position.z = this.player.position.z;
    }
}
