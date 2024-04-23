import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const fileReader = new FileReader()

const inputfile = document.getElementById('inputFile')
const buttons = document.getElementById('buttons')
let selectedForm = buttons.options[buttons.selectedIndex].value

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

camera.position.z = 3

const file = document.getElementById('file')
file.addEventListener('change', (e)=> {
	e.preventDefault()
	selectedForm = ""
	const fileURL = new URL(URL.createObjectURL(file.files[0]), import.meta.url)
	console.log(fileURL.href)
	const assetLoader = new GLTFLoader()
	assetLoader.load(fileURL.href, function(gltf) {
		const model = gltf.scene
		scene.add(model)
	}, undefined, function(err) {
		console.log(err)
	})
})

buttons.addEventListener('change', () => {
	selectedForm = buttons.options[buttons.selectedIndex].value
	window.location.reload()
})

const OControls = new OrbitControls(camera, renderer.domElement)
OControls.enableDamping = true
OControls.dampingFactor = 0.02

let geo
switch (selectedForm) {
case 'Icosahedron':
	geo = new THREE.IcosahedronGeometry(1.0, 2)
	break;
case 'Square':
	geo = new THREE.BoxGeometry(2, 2, 2)
	break;
case 'Cone':
	geo = new THREE.ConeGeometry(1.0, 2, 7)
	break;
case 'ChooseFile':
	inputFile.style.display = 'block'
	break;
default:
	break;
}

const mat = new THREE.MeshStandardMaterial({
	color: 0xffffff,
	flatShading: true
})
const mesh = new THREE.Mesh(geo, mat)
scene.add(mesh)

const wireMat = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	wireframe: true
})
const wireMesh = new THREE.Mesh(geo, wireMat)
mesh.add(wireMesh)
wireMesh.scale.setScalar(1.001)

const hemiLight = new THREE.HemisphereLight( 0x0026ff, 0x8800ff )
hemiLight.position.set( 0, 100, 0 )
scene.add( hemiLight )

const dirLight = new THREE.DirectionalLight( 0x0026ff )
dirLight.position.set( 25, 100, -25 )
scene.add( dirLight )

const dirLight2 = new THREE.DirectionalLight( 0x8800ff )
dirLight2.position.set( -25, -100, 25 )
scene.add( dirLight2 )

function animation(t = 0) {
	requestAnimationFrame(animation)
	mesh.rotation.y = t / 10000
	renderer.render(scene, camera)
	OControls.update()
}

animation()
