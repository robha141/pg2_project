import * as THREE from "three";

export class CameraHandler {
    constructor() {
        this.cameraHeight = 100;
        this.cameraZOffset = 55;
        this.camera = new THREE.PerspectiveCamera( 
            100, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
    }

    updateCamera(scenePosition) {
        this.camera.position.x = scenePosition.x;
        this.camera.position.y = this.cameraHeight;
        this.camera.position.z = scenePosition.z + this.cameraZOffset;
        this.camera.lookAt(scenePosition);
    }
}