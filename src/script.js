import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 ***** WE USE VIEWPOINT (only the part of the browser that shows the figure)
 */
let sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/*
*  Resizing (NEW)
*/
window.addEventListener('resize', () => {
    // Update canvas size (viewpoint)
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update the camera
    camera.aspect = sizes.height /sizes.width
    camera.updateProjectionMatrix() // <- IMPORTANT

    // Update renderer
    renderer.setSize(sizes.height, sizes.width)
    // Pixel ration MAX is 2 -for 2022 seems to be enough- (NEW)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

/*
*  Fullscreen (NEW)
**** Handles Safari and all other browswers **** 
*/
window.addEventListener('dblclick', () => {
    const checkBrowser = document.webkitFullscreenElement || document.fullscreenElement;

    if(!checkBrowser){
        (canvas.requestFullscreen) ? canvas.requestFullscreen() : canvas.webkitRequestFullscreen();
    }
    else {
        (document.exitFullscreen) ? document.exitFullscreen() : document.webkitExitFullscreen();
    }
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()