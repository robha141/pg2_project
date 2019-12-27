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

    getObjectById(uuid) {
        return this.game.scene.getObjectByName(name);
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