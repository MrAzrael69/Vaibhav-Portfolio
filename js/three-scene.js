// Three.js background scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg-canvas'),
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Main crystal
const crystalGeometry = new THREE.IcosahedronGeometry(2.2, 1);
const crystalMaterial = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    wireframe: true,
    transparent: true,
    opacity: 0.4
});
const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
scene.add(crystal);

// Inner crystal
const innerGeometry = new THREE.IcosahedronGeometry(1.6, 0);
const innerMaterial = new THREE.MeshBasicMaterial({
    color: 0x4ade80,
    wireframe: true,
    transparent: true,
    opacity: 0.35
});
const innerCrystal = new THREE.Mesh(innerGeometry, innerMaterial);
scene.add(innerCrystal);

// Core
const coreGeometry = new THREE.OctahedronGeometry(0.8, 0);
const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0xbbf7d0,
    wireframe: true,
    transparent: true,
    opacity: 0.6
});
const coreCrystal = new THREE.Mesh(coreGeometry, coreMaterial);
scene.add(coreCrystal);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 600;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 40;
    positions[i + 1] = (Math.random() - 0.5) * 40;
    positions[i + 2] = (Math.random() - 0.5) * 40;

    const colorChoice = Math.random();
    if (colorChoice < 0.4) {
        colors[i] = 0.29;
        colors[i + 1] = 0.85;
        colors[i + 2] = 0.47;
    } else if (colorChoice < 0.7) {
        colors[i] = 0.73;
        colors[i + 1] = 0.97;
        colors[i + 2] = 0.82;
    } else {
        colors[i] = 0.9;
        colors[i + 1] = 1.0;
        colors[i + 2] = 0.9;
    }
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.04,
    transparent: true,
    opacity: 0.7,
    vertexColors: true
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.z = 6;

let scrollY = 0;
let mouseX = 0;
let mouseY = 0;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
});

function animateScene() {
    requestAnimationFrame(animateScene);

    crystal.rotation.x += 0.003;
    crystal.rotation.y += 0.005;

    innerCrystal.rotation.x -= 0.004;
    innerCrystal.rotation.y -= 0.003;

    coreCrystal.rotation.x += 0.006;
    coreCrystal.rotation.y -= 0.004;
    coreCrystal.rotation.z += 0.002;

    particles.rotation.y += 0.0004;
    particles.rotation.x += 0.0001;

    camera.position.y = -scrollY * 0.002;

    crystal.rotation.x += mouseY * 0.01;
    crystal.rotation.y += mouseX * 0.01;

    renderer.render(scene, camera);
}

animateScene();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
