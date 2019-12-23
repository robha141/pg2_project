import * as THREE from "three";
import * as TWEEN from "tween.js";

export default class BlackHole {
    constructor(scene) {
        this.scene = scene;
        this.object = null;

        this.isTextureVisible = false;

        this.initObject();
        this.initTexture();
    }

    initObject() {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        this.basicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.object = new THREE.Mesh( geometry, this.basicMaterial );

        this.scene.add( this.object );
    }

    initTexture() {
        // instantiate a loader
        const loader = new THREE.TextureLoader();
        loader.load(
            'texture.jpeg',
            ( texture ) => {
                // in this example we create the material when the texture is loaded
                this.textureMaterial = new THREE.MeshBasicMaterial({
                    map: texture
                });
            },
            function ( err ) {
                console.error( 'An error happened.' );
            }
        );
    }

    startRotation() {
        this.interval = setInterval(() => {
            this.object.rotation.y += 0.1;
        }, 1000 / 60);
    }

    stopRotation() {
        clearInterval(this.interval);
    }

    showTexture() {
        this.isTextureVisible = true;
        this.object.material = this.textureMaterial;
    }

    hideTexture() {
        this.isTextureVisible = false;
        this.object.material = this.basicMaterial;
    }

    moveUp() {
        let position = {x: 0, y: 0, z: 0};
        console.log(position);
        const tween = new TWEEN.Tween(position)
            .to({x: 0, y: 4, z: 0}, 1000)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(() => {
                console.log(position);
                this.object.position.x = position.x;
                this.object.position.y = position.y;
                this.object.position.z = position.z;
            })
            .start();
    }
}
