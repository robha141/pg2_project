export class GameObject {
    constructor(game) {
        this.game = game;
        this.sceneObject = null;
        this.objectName = null;
    }

    /**
     * Called once on setup. In default implementation, scene object is added to scene. If you are adding scene object to scene in onSetup
     * call it after scene object init.
     */
    onSetup() {
        this.addSceneObject();
        if (this.sceneObject.geometry.boundingBox != null) {
            this.updateBoundingBox();
        }
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

    getInputHandler() {
        return this.game.inputHandler;
    }

    getCameraHandler() {
        return this.game.cameraHandler;
    }

    // Collisions

    /**
     * Bounding box should be set on geometry, othrewise this function will not work.
     */
    updateBoundingBox() {
        this.sceneObject.updateMatrixWorld();
        let box = this.sceneObject.geometry.boundingBox.clone();
        box.applyMatrix4(this.sceneObject.matrixWorld);
        this.boundingBox = box;
    }

    getFirstCollision(objectName) {
        let objects = this.game.getAllObjectsWithName(objectName);
        return objects.find(object => this.boundingBox.intersectsBox(object.boundingBox));
    }

    
    getObjectName() {
        throw new Error('Gameobject must have a name!');
    }
}