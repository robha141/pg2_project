export class GameObject {
    constructor(game) {
        this.game = game;
    }

    // Called once on setup.

    onSetup() {}

    // Called every frame.

    onUpdate() {}

    // Convience functions.

    addObjectToScene(object) {
        this.game.scene.add(object);
    }

    getObjectByName(name) {
        return this.game.scene.getObjectByName(name);
    }

    getObjectById(id) {
        return this.game.scene.getObjectById(id);
    }

    getIntersections(objects) {
        return this.game.raycastHandler.getIntersections(objects);
    }

    getFirstIntersection(objects) {
        return this.game.raycastHandler.getFirstIntersection(objects);
    }

    getInputHandler() {
        return this.game.inputHandler;
    }

    getCameraHandler() {
        return this.game.cameraHandler;
    }
}