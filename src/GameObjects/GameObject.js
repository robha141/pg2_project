export default class GameObject {
    constructor() {
        this.delta = 0.0;
    }

    onSetup(scene) {
        throw new Error('Objects needs to be created and added to scene.');
    }

    onRender() {}
}