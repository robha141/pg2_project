import * as THREE from "three";

export class RaycastHandler {
    constructor(inputHandler, cameraHandler) {
        this.inputHandler = inputHandler;
        this.cameraHandler = cameraHandler;
        this.rayCaster = new THREE.Raycaster();
    }

    getIntersections(objects) {
        this.rayCaster.setFromCamera(this.inputHandler.mouse, this.cameraHandler.camera);
        return this.rayCaster.intersectObjects(objects);
    }

    getFirstIntersection(objects) {
        const intersections = this.getIntersections(objects);
        return intersections.length > 0 ? intersections[0].point : null;
    }
}