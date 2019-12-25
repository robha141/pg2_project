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

    // Player controls and update

    playerIsShooting() {
        return this.inputHandler.mouseDown 
            && this.inputHandler.shiftDown
    }

    playerIsMoving() {
        return this.inputHandler.mouseDown
    }

    updatePlayer() {
        if (this.playerIsShooting()) {
            // TODO: - shooting
        } else if (this.playerIsMoving()) {
            const intersects = this.getIntersections(this.intersectObjects);
            if (intersects.length > 0) {
                this.player.setNewPosition(intersects[0].point);
            }
        }
        this.updatePlayerTransformation();
    }

    updatePlayerTransformation() {
        this.player.calculateNewPosition();
        const playerObject = this.player.getAssociatedObject(this.scene);
        playerObject.position.x = this.player.position.x;
        playerObject.position.y = this.player.position.y;
        playerObject.position.z = this.player.position.z;
    }

    rotate() {
        const playerObject = this.player.getAssociatedObject(this.scene);
        playerObject.rotateY(0.7853981634);
    }

    // Raycasting

    getIntersections(objects) {
        this.rayCaster.setFromCamera(this.inputHandler.mouse, this.cameraHandler.camera);
        return this.rayCaster.intersectObjects(objects);
    }
}
