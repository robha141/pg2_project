export class GameObjectModel {
    constructor(name) {
        this.name = name;
    }

    getAssociatedObject(scene) {
        return scene.getObjectByName(this.name);
    }
}