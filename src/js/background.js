import * as THREE from 'three';
import orbitControls from 'three-orbit-controls';
const OrbitControls = orbitControls(THREE);

const detectWebGL = () => {
  var canvas = document.createElement("canvas");
  // Get WebGLRenderingContext from canvas element.
  var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  // Report the result.
  return (gl && gl instanceof WebGLRenderingContext)
}

const webglEl = document.getElementById('canvas');
const width = webglEl.offsetWidth;
const height = webglEl.offsetHeight;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
camera.position.x = 0.1;
var renderer = detectWebGL()
  ? new THREE.WebGLRenderer()
  : new THREE.CanvasRenderer();
renderer.setSize(width, height);

var sphere = new THREE.Mesh(new THREE.SphereGeometry(100, 20, 20), new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(require('../imgs/universe_360.png'))}));
sphere.scale.x = -1;
scene.add(sphere);

var controls = new OrbitControls(camera);

controls.noPan = true;
controls.noZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.1;
webglEl.appendChild(renderer.domElement);
render();
function render() {
  controls.update();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
function onMouseWheel(event) {
  event.preventDefault();

  if (event.wheelDeltaY) { // WebKit
    camera.fov -= event.wheelDeltaY * 0.05;
  } else if (event.wheelDelta) { // Opera / IE9
    camera.fov -= event.wheelDelta * 0.05;
  } else if (event.detail) { // Firefox
    camera.fov += event.detail * 1.0;
  }
  camera.fov = Math.max(40, Math.min(100, camera.fov));
  camera.updateProjectionMatrix();
}
// document.addEventListener('mousewheel', onMouseWheel, false);
// document.addEventListener('DOMMouseScroll', onMouseWheel, false);
