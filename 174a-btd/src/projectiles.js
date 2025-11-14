// projectiles.js - Shooting and projectile management
import * as THREE from 'three';

const projectiles = [];

export function shootProjectile(scene, camera) {
    const origin = new THREE.Vector3();
    const dir = new THREE.Vector3();

    camera.getWorldPosition(origin);
    camera.getWorldDirection(dir);

    const speed = 25;
    const velocity = dir.multiplyScalar(speed);

    const geom = new THREE.SphereGeometry(0.1, 16, 16);
    const mat = new THREE.MeshPhongMaterial({ color: 0xff4444 });
    const bullet = new THREE.Mesh(geom, mat);
    bullet.castShadow = true;
    bullet.position.copy(origin);
    scene.add(bullet);

    projectiles.push({
        mesh: bullet,
        velocity,
        radius: 0.1,
    });
}

export function updateProjectiles(scene, dt, gravity) {
    const tmpP = new THREE.Vector3();

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.velocity.addScaledVector(gravity, dt);
        p.mesh.position.addScaledVector(p.velocity, dt);

        if (p.mesh.position.y < -5 || p.mesh.position.lengthSq() > 10000) {
            scene.remove(p.mesh);
            p.mesh.geometry.dispose();
            p.mesh.material.dispose();
            projectiles.splice(i, 1);
        }
    }

    return tmpP;
}

export function getProjectiles() {
    return projectiles;
}

export function removeProjectile(scene, index) {
    const p = projectiles[index];
    scene.remove(p.mesh);
    p.mesh.geometry.dispose();
    p.mesh.material.dispose();
    projectiles.splice(index, 1);
}
