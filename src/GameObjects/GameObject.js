export class GameObject {
    constructor(game) {
        this.game = game;
        this.sceneObject = null;
    }

    /**
     * Called once on setup. In default implementation, scene object is added to scene. If you are adding scene object to scene in onSetup
     * call it after scene object init.
     */
    onSetup() {
        this.addSceneObject();
    }

    /**
     * Called every frame.
     */
    onUpdate() {}

    // Adding and removing.

    addToGame() {
        this.game.addGameObject(this);
    }

    removeFromGame() {
        this.game.removeGameObject(this);
    }

    addSceneObject() {
        if (this.sceneObject == null) {
            return;
        }
        this.game.scene.add(this.sceneObject);
    }

    removeSceneObject() {
        if (this.sceneObject == null) {
            return;
        }
        this.game.scene.remove(this.sceneObject);
    }

    removeFromSceneAndGame() {
        this.removeSceneObject();
        this.removeFromGame();
    }

    // Raycasting from mouse.

    /**
     * Return mouse intersect point on associated scene object.
     */
    getSceneObjectIntersection() {
        if (this.sceneObject == null) {
            return null;
        }
        return this.game.raycastHandler.getFirstIntersection([this.sceneObject]);
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