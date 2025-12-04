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
        description: 'Standard weapon. Balanced fire rate and damage.'
    },
    MACHINE_GUN: {
        id: 'MACHINE_GUN',
        name: 'Machine Gun',
        damage: 0.5,
        fireRate: 0.1,      // very fast
        projectileSpeed: 60,
        projectileColor: 0xff9900,
        projectileSize: 0.08,
        description: 'Rapid fire with lower damage. High fire rate.'
    },
    SHOTGUN: {
        id: 'SHOTGUN',
        name: 'Shotgun',
        damage: 2,
        fireRate: 0.6,
        projectileSpeed: 40,
        projectileColor: 0xff0000,
        projectileSize: 0.15,
        description: 'Heavy damage with moderate fire rate.'
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
