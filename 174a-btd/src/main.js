// src/main.js - Modularized version
import './index.css';
import * as THREE from 'three';
import { initScene } from './scene.js';
import { initUI } from './ui.js';
import { initWalls } from './walls.js';
import { loadCones, loadPlayerHand } from './objects.js';
import { spawnBalloon, updateBalloons, getBalloons, removeBalloon } from './balloons.js';
import { shootProjectile, updateProjectiles, getProjectiles, removeProjectile } from './projectiles.js';
import { initControls } from './controls.js';

// Root container
const root = document.getElementById('root');
root.innerHTML = '';
root.style.margin = '0';
root.style.padding = '0';
root.style.width = '100vw';
root.style.height = '100vh';

// Main container for Three + overlays
const container = document.createElement('div');
container.style.width = '100%';
container.style.height = '100%';
container.style.position = 'relative';
container.style.overflow = 'hidden';
container.style.backgroundColor = 'black';
root.appendChild(container);

// Initialize all modules
const { scene, camera, renderer, cleanup: sceneCleanup } = initScene(container);
const { setScore, getScore } = initUI(container);
const { checkWallCollision } = initWalls(scene);
const { updateMovement, cleanup: controlsCleanup } = initControls(camera, renderer, () => shootProjectile(scene, camera));

// Load 3D objects
loadCones(scene);
loadPlayerHand(camera);

// Spawn initial balloon
spawnBalloon(scene);

// Physics constants
const gravity = new THREE.Vector3(0, -9.8, 0);
const clock = new THREE.Clock();
const moveSpeed = 8.0;

// Temporary vectors for collision detection
const tmpP = new THREE.Vector3();
const tmpB = new THREE.Vector3();

// Main animation loop
let animationId;

function animate() {
    animationId = requestAnimationFrame(animate);

    const dt = clock.getDelta();

    // Update player movement
    updateMovement(dt, moveSpeed, checkWallCollision);

    // Update projectiles
    updateProjectiles(scene, dt, gravity);

    // Update balloons
    updateBalloons(scene, dt, gravity);

    // Check collisions between projectiles and balloons
    const balloons = getBalloons();
    const projectiles = getProjectiles();

    for (let i = balloons.length - 1; i >= 0; i--) {
        const b = balloons[i];
        b.mesh.getWorldPosition(tmpB);

        for (let j = projectiles.length - 1; j >= 0; j--) {
            const p = projectiles[j];
            p.mesh.getWorldPosition(tmpP);

            const dist = tmpB.distanceTo(tmpP);
            const hitDistance = b.radius + p.radius;
            if (dist < hitDistance) {
                removeBalloon(scene, i);
                removeProjectile(scene, j);
                setScore(getScore() + 1);
                spawnBalloon(scene);
                break;
            }
        }
    }

    renderer.render(scene, camera);
}

animate();

// Vite HMR
if (import.meta.hot) {
    import.meta.hot.dispose(() => {
        cancelAnimationFrame(animationId);
        sceneCleanup();
        controlsCleanup();
    });
}
