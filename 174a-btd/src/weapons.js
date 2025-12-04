// weapons.js - Weapon configurations and stats

export const WEAPONS = {
    PISTOL: {
        id: 'PISTOL',
        name: 'Pistol',
        damage: 1,
        fireRate: 0.3,      // seconds between shots
        projectileSpeed: 50,
        projectileColor: 0x000000,
        projectileSize: 0.1,
        description: 'Standard weapon. Balanced fire rate and damage.',
        modelPath: '../models/hand.obj',
        modelScale: { x: 0.1, y: 0.1, z: 0.1 },
        modelPosition: { x: 0.15, y: -0.3, z: -0.62 },
        modelRotation: { x: 0, y: Math.PI * 3 / 2, z: 0 },
        modelMaterial: { color: 0xb35432, type: 'phong' }
    },
    MACHINE_GUN: {
        id: 'MACHINE_GUN',
        name: 'Machine Gun',
        damage: 0.5,
        fireRate: 0.1,      // very fast
        projectileSpeed: 60,
        projectileColor: 0xff9900,
        projectileSize: 0.08,
        description: 'Rapid fire with lower damage. High fire rate.',
        modelPath: '../models/hand.obj',
        modelScale: { x: 0.1, y: 0.1, z: 0.1 },
        modelPosition: { x: 0.15, y: -0.3, z: -0.62 },
        modelRotation: { x: 0, y: Math.PI * 3 / 2, z: 0 },
        modelMaterial: { color: 0xb35432, type: 'phong' }
    },
    ICE_KNIVES: {
        id: 'ICE_KNIVES',
        name: 'Ice Knives',
        damage: 2,
        fireRate: 0.6,
        projectileSpeed: 40,
        projectileColor: 0x87CEEB,
        projectileSize: 0.15,
        description: 'Heavy damage with moderate fire rate.',
        modelPath: '../models/knives.obj',
        modelScale: { x: 0.15, y: 0.15, z: 0.15 },
        modelPosition: { x: 0.5, y: -0.2, z: -0.55 },
        modelRotation: { x: Math.PI * 2 / 3, y: Math.PI, z: Math.PI / 2 },
        modelMaterial: { color: 0x34E5EB, type: 'standard', metalness: 0.1, roughness: 0.1 }
    }
};

// Default weapon
export let currentWeapon = WEAPONS.PISTOL;

export function setCurrentWeapon(weaponId) {
    if (WEAPONS[weaponId]) {
        currentWeapon = WEAPONS[weaponId];
        return true;
    }
    return false;
}

export function getCurrentWeapon() {
    return currentWeapon;
}
