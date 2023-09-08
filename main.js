import * as THREE from 'three';
import './styles.css'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Scene
const scene = new THREE.Scene();

// Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: '#00ff83',
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes
const windowSz = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Light
const al = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(al);

const light = new THREE.PointLight(0xffffff, 0.8, 100);
light.position.set(0, 5, 10);
scene.add(light)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);



// Camera
const camera = new THREE.PerspectiveCamera(45, windowSz.width / windowSz.height, 0.1, 100);
camera.position.z = 15;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(windowSz.width, windowSz.height);
renderer.render(scene, camera);

// Controls 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
// controls.autoRotate = true;

window.addEventListener('onresize', () => {
    windowSz.width = window.innerWidth;
    windowSz.height = window.innerHeight;
    //update camera
    camera.aspect = windowSz.width / windowSz.height;
    camera.updateProjectionMatrix()
    renderer.setSize(windowSz.width, windowSz.height);
})

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
    console.log("loop")
}
loop();