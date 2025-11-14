// objects.js - Loading 3D objects (cones)
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

export function loadCones(scene) {
    const objLoader = new OBJLoader();

    // Orange material for cones
    const orangeMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF8C00,
        shininess: 30
    });

    const conePositions = [
        { x: -2.2, z: 7.8 },
        { x: -2.2, z: 9.3 },
        { x: 2.2, z: 7.8 },
        { x: 2.2, z: 9.3 },
    ];

    conePositions.forEach((pos, index) => {
        objLoader.load(
            '../models/cone.obj',
            function (object) {
                // Apply transformations
                object.scale.set(0.5, 0.5, 0.5);
                object.position.set(pos.x, 0, pos.z);

                // Apply orange material to all meshes in the object
                object.traverse((child) => {
                    if (child.isMesh) {
                        child.material = orangeMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(object);
            },
            function (xhr) {
                console.log(`Cone ${index + 1}: ${(xhr.loaded / xhr.total * 100)}% loaded`);
            },
            function (error) {
                console.error(`Error loading cone ${index + 1}:`, error);
            }
        );
    });
}
