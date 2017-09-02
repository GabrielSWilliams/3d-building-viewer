// instantiate a loader
var loader = new THREE.JSONLoader();
var radius = 300, theta = 0;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
hemiLight.visible = true;
scene.add( hemiLight );
hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
scene.add( hemiLightHelper );
scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


camera.position.z = 5;



// load a resource
loader.load(

	// resource URL
	'assets/buildings/chrystie.json',

	// Function when resource is loaded
	function ( geometry, materials ) {

    var material = new THREE.MeshPhongMaterial( {
        color: 0xff0000,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
    } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh )
	}
);

function animate() {
	requestAnimationFrame( animate );
        theta += 0.1;
				camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
				camera.lookAt( scene.position );
	renderer.render( scene, camera );
}
animate();
