import * as THREE from 'three';
import modernizr from 'modernizr'
import orbitControls from 'three-orbit-controls';

const OrbitControls = orbitControls(THREE);

const webglEl = document.getElementById('canvas');
const width = webglEl.offsetWidth;
const height = webglEl.offsetHeight;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
camera.position.x = 0.1;
var renderer = modernizr.webgl
  ? new THREE.WebGLRenderer()
  : new THREE.CanvasRenderer();
renderer.setSize(width, height);

var sphere = new THREE.Mesh(new THREE.SphereGeometry(100, 10, 10), new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture(require('../imgs/360_7.jpg'))
}));
sphere.scale.x = -1;
scene.add(sphere);

// Setting Orbit Controls
var controls = new OrbitControls(camera, webglEl);
controls.noPan = true;
controls.noZoom = true;
controls.autoRotate = true;
controls.enableKeys = true;
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;
controls.autoRotateSpeed = 0.1;
function updateControls() {
  controls.update();
}

controls.addEventListener('change', updateControls);

webglEl.appendChild(renderer.domElement);

function render() {
  updateControls();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();

const update = () => {
  const width = webglEl.offsetWidth;
  const height = webglEl.offsetHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", update);
window.addEventListener("orientationchange", update);

if (modernizr.hasEvent('deviceOrientation')) {
  window.addEventListener('deviceorientation', (event) => {
    alpha = Math.round(event.alpha);
    beta = Math.round(event.beta);
    gamma = Math.round(event.gamma);
    document.getElementById('alpha').innerHTML(alpha);
    document.getElementById('beta').innerHTML(beta);
    document.getElementById('gamma').innerHTML(gamma);
  }, true);
}


document.getElementById('reset').addEventListener('click', (event) => {
  controls.reset();
});
document.getElementById('up').addEventListener('click', (e) => {
  controls.position0.set( 0, controls.position0.y + 0.5, 0 ); // set a new desired position
  controls.target0.set( 0, 0, 0 ); // set a new target
  controls.update();
})


// controls.target0.set( 0, 0, 0 ); // set a new target
// controls.up0.set( 0, 1, 0 ); // set a new up vector
// controls.reset();


// controls.position0.set( 0, 0, 10 ); // set a new desired position
// controls.target0.set( 0, 0, 0 ); // set a new target
// controls.up0.set( 0, 1, 0 ); // set a new up vector
// controls.reset();

// function onMouseWheel(event) {
//   console.log(camera.fov);
//   event.preventDefault();
//
//   if (event.wheelDeltaY) { // WebKit
//     camera.fov -= event.wheelDeltaY * 0.05;
//   } else if (event.wheelDelta) { // Opera / IE9
//     camera.fov -= event.wheelDelta * 0.05;
//   } else if (event.detail) { // Firefox
//     camera.fov += event.detail * 1.0;
//   }
//   camera.fov = Math.max(40, Math.min(100, camera.fov));
//   camera.updateProjectionMatrix();
// }
// document.addEventListener('mousewheel', onMouseWheel, false);
// document.addEventListener('DOMMouseScroll', onMouseWheel, false);
