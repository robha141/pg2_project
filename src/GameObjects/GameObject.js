import { Scene } from "../Scene";

export class GameObject {
    constructor() {
        this.delta = 0.0;
    }

    onSetup(scene) {
        throw new Error('Objects needs to be created and added to scene.');
    }

    onRender() {
        throw new Error('Objects needs to be rendered somehow.');
    }
}