// instantiate a loader
var loader = new THREE.JSONLoader();
var radius = 300, theta = 0;
var scene = new THREE.Scene();
scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
scene.fog = new THREE.Fog( scene.background, 1, 5000 );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );

// hemilight

hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.1, 1, 1 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
hemiLight.visible = true;
scene.add( hemiLight );

hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
scene.add( hemiLightHelper );
scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );

// directional light

dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( -1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );

dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;


// skydome

var vertexShader = document.getElementById( 'vertexShader' ).textContent;
var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
var uniforms = {
	topColor:    { value: new THREE.Color( 0x0077ff ) },
	bottomColor: { value: new THREE.Color( 0x0077ff ) },
	offset:      { value: 33 },
	exponent:    { value: 0.6 }
};
uniforms.topColor.value.copy( hemiLight.color );

scene.fog.color.copy( uniforms.bottomColor.value );

var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );
var sky = new THREE.Mesh( skyGeo, skyMat );
scene.add( sky );


// renderer

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// camera

camera.position.x = 0;
camera.position.y = 150;
camera.position.z = 200;
var controls = new THREE.OrbitControls( camera );


// load a resource
loader.load(

	// resource URL
	'assets/buildings/chrystie.json',

	// Function when resource is loaded
	function ( geometry, materials ) {

    var material = new THREE.MeshPhongMaterial( {
        color: 0xD3D3D3,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
    } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh )
	}
);

function animate() {
	renderer.render( scene, camera );

	requestAnimationFrame( animate );
	controls.update()
}
animate();
