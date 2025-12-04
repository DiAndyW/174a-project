// projectiles.js - Shooting and projectile management
import * as THREE from 'three';
import { getCurrentWeapon } from './weapons.js';

const projectiles = [];
const raycaster = new THREE.Raycaster();

export function shootProjectile(scene, camera) {
    const weapon = getCurrentWeapon();
    const origin = new THREE.Vector3();
    const dir = new THREE.Vector3();

    // Bullet initial position + direction
    camera.getWorldPosition(origin);
    camera.getWorldDirection(dir);

    const velocity = dir.clone().multiplyScalar(weapon.projectileSpeed);

    // Projectile mesh with weapon properties
    const geom = new THREE.SphereGeometry(weapon.projectileSize, 16, 16);
    const mat = new THREE.MeshPhongMaterial({ color: weapon.projectileColor });
    const bullet = new THREE.Mesh(geom, mat);
    bullet.castShadow = true;
    bullet.position.copy(origin);
    scene.add(bullet);

    projectiles.push({
        mesh: bullet,
        velocity,
        radius: weapon.projectileSize * 3,
        prevPos: origin.clone(),
        damage: weapon.damage,  // Store damage with projectile
    });
}

export function updateProjectiles(scene, dt, gravity) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];

        // Save previous position BEFORE moving
        p.prevPos.copy(p.mesh.position);

        // Apply gravity
        p.velocity.addScaledVector(gravity, dt);

        // Move projectile
        p.mesh.position.addScaledVector(p.velocity, dt);

        // Remove dead projectiles
        if (
            p.mesh.position.y < -5 ||
            p.mesh.position.lengthSq() > 10000
        ) {
            scene.remove(p.mesh);
            p.mesh.geometry.dispose();
            p.mesh.material.dispose();
            projectiles.splice(i, 1);
            continue;
        }
    }
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
