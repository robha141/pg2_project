import * as THREE from "three";

export class InputHandler {
    constructor() {
        this.mouse = new THREE.Vector2(0, 0);
        this.mouseDown = false;
        this.shiftDown = false;
    }

    holdingMouse(holding) {
        this.mouseDown = holding;
    }

    holdingShiftKey(holding) {
        this.shiftDown = holding;
    }

    updateMouse(event, renderer) {
        this.mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    }
}