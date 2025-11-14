// balloons.js - Balloon creation and management
import * as THREE from 'three';

const balloons = [];

function createBalloonMesh() {
    const group = new THREE.Group();

    const bodyGeom = new THREE.SphereGeometry(0.5, 32, 32);
    const bodyMat = new THREE.MeshPhongMaterial({
        color: 0x55aaff,
        shininess: 80,
        specular: 0x222222,
    });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.castShadow = true;
    group.add(body);

    const stringGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.9);
    const stringMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const string = new THREE.Mesh(stringGeom, stringMat);
    string.position.y = -0.75;
    string.castShadow = true;
    group.add(string);

    return group;
}

export function spawnBalloon(scene) {
    const balloonMesh = createBalloonMesh();
    balloonMesh.position.set(-5, 2, -10);
    scene.add(balloonMesh);

    const velocity = new THREE.Vector3(6, 6, 0);

    balloons.push({
        mesh: balloonMesh,
        velocity,
        radius: 0.5,
    });
}

export function updateBalloons(scene, dt, gravity) {
    const tmpB = new THREE.Vector3();

    for (let i = balloons.length - 1; i >= 0; i--) {
        const b = balloons[i];
        b.velocity.addScaledVector(gravity, dt);
        b.mesh.position.addScaledVector(b.velocity, dt);

        if (b.mesh.position.y < -2 || b.mesh.position.lengthSq() > 10000) {
            scene.remove(b.mesh);
            b.mesh.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    child.material.dispose();
                }
            });
            balloons.splice(i, 1);
            // Always keep at least one balloon
            spawnBalloon(scene);
        }
    }

    return tmpB;
}

export function getBalloons() {
    return balloons;
}

export function removeBalloon(scene, index) {
    const b = balloons[index];
    scene.remove(b.mesh);
    b.mesh.traverse((child) => {
        if (child.isMesh) {
            child.geometry.dispose();
            child.material.dispose();
        }
    });
    balloons.splice(index, 1);
}
