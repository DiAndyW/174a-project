// scene.js - Scene, camera, renderer, and lights setup
import * as THREE from 'three';

export function initScene(container) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202535);

    // Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 1.6, 10);
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(-5, 10, -2);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.left = -20;
    dirLight.shadow.camera.right = 20;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -20;
    scene.add(dirLight);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshPhongMaterial({ color: 0x338c1f});
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Resize handler
    function onResize() {
        const { clientWidth, clientHeight } = container;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
    }
    window.addEventListener('resize', onResize);

    return {
        scene,
        camera,
        renderer,
        cleanup: () => {
            window.removeEventListener('resize', onResize);
        }
    };
}
