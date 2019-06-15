var maxX = 50;
var maxY = 50;

var objectContainer = [];

var scene;
var camera;
var renderer;

var controls;

var stats;

function init()
{
    scene = new THREE.Scene();
    // 0.1, 1000
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 200 );

    renderer = new THREE.WebGLRenderer(
        antialias=true, 
        precision="mediump", 
        preserveDrawingBuffer="false",
        powerPreference="high-performance");

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaFactor = 2.2;
    renderer.gammaOutPut = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    
    stats = new Stats();
    stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );


    //Create a PointLight and turn on shadows for the light
    var light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( maxX/2, 30, maxY/2 );
    light.castShadow = true;            // default false
    scene.add( light );

    //Create a helper for the shadow camera (optional)
    var helper = new THREE.CameraHelper( light.shadow.camera );
    scene.add( helper );

    var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.05);
    scene.add( ambientLight );

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512;  // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5;       // default 0.5
    light.shadow.camera.far = 500      // default 500

    camera.position.set(1, 30, maxY);
    //camera.rotation.set(0,0,0);
    //camera.position.set( -30,30,30 );
    camera.rotation.order = 'YXZ';
    camera.rotation.y = - Math.PI / 4;
    camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );
    
    flatBack(maxX, maxY);

    var player = new OBJ(1,
        new THREE.Vector3(1,32,32),
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,0,0),
        objectContainer);
    
    for(var i=0; i<objectContainer.length; i++)
        scene.add(objectContainer[i].mesh);
}

function animate()
{
    requestAnimationFrame( animate );
    stats.begin();

    controls.update();

	stats.end();
	renderer.render( scene, camera );
}

var speed = 1;
document.onkeydown = function checkKey(e)
{
    e = e || window.event;

    /*
    if (e.keyCode == '38') camera.position.z -= speed; // up arrow
    if (e.keyCode == '40') camera.position.z += speed; // down arrow
    if (e.keyCode == '37') camera.position.x -= speed; // left arrow
    if (e.keyCode == '39') camera.position.x += speed; // right arrow
    if (e.keyCode == '34') camera.position.y += speed; // page down
    if (e.keyCode == '33') camera.position.y -= speed; // page up

    if (e.keyCode == '83') camera.rotation.x -= speed/100;
    if (e.keyCode == '87') camera.rotation.x += speed/100;
    if (e.keyCode == '68') camera.rotation.y -= speed/100;
    if (e.keyCode == '65') camera.rotation.y += speed/100;
    if (e.keyCode == '69') camera.rotation.z -= speed/100;
    if (e.keyCode == '81') camera.rotation.z += speed/100;

    */

    var i = objectContainer.length - 1;
    if (e.keyCode == '87') objectContainer[i].Update("up");
    if (e.keyCode == '83') objectContainer[i].Update("down");
    if (e.keyCode == '65') objectContainer[i].Update("left");
    if (e.keyCode == '68') objectContainer[i].Update("right");
    if (e.keyCode == '69') objectContainer[i].Update("+");
    if (e.keyCode == '81') objectContainer[i].Update("-");
    
}

init();
animate();

function OBJ(type, dim, pos, rot, buffer)
{
    this.type = type;
    this.dim = new THREE.Vector3(dim.x, dim.y, dim.z);
    this.pos = new THREE.Vector3(pos.x, pos.y, pos.z);
    this.rot = new THREE.Vector3(rot.x, rot.y, rot.z);

    this.mesh = null;
    var shadow = false;

    switch (this.type)
    {
        case (0): // general terrain
        default:
            var material = new THREE.MeshLambertMaterial();
            var color = 0x55DD88;
            material.color.setHex(color);
            var geometry = new THREE.BoxBufferGeometry(this.dim.x, this.dim.y, this.dim.z);
            this.Update = function(data)
            {
                return;
            };
        break;
        case (1):   // General player
            shadow = true;
            var material = new THREE.MeshLambertMaterial();
            var color = 0xFFFF00;
            material.color.setHex(color);
            var geometry = new THREE.SphereBufferGeometry(this.dim.x, this.dim.y, this.dim.z);
            this.Update = function(data)
            {
                console.log("Update: general player");
                if(data == "up")
                    this.mesh.position.z -= 1.0;
                if(data == "down")
                    this.mesh.position.z += 1.0;
                if(data == "left")
                    this.mesh.position.x -= 1.0;
                if(data == "right")
                    this.mesh.position.x += 1.0;
                if(data == "+")
                    this.mesh.position.y -= 1.0;
                if(data == "-")
                    this.mesh.position.y += 1.0;
                
                //material.color.setHex(0xFFFF00);
            };
        break;
    };

    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.position.x = this.pos.x;
    this.mesh.position.y = this.pos.y;
    this.mesh.position.z = this.pos.z;
    
    this.mesh.rotation.x = this.rot.x;
    this.mesh.rotation.y = this.rot.y;
    this.mesh.rotation.z = this.rot.z;

    this.mesh.castShadow = shadow;
    this.mesh.receiveShadow = true;

    this.ID = buffer.length;
    buffer.push(this);
}

function valueToXY(value, max_x, max_y)
{
    var r = [Math.floor(value%max_x), Math.floor((value%max_x)%max_y)];
    return r;
}

function XYtoValue(x, y, max_x)
{
    var r = x*max_x + y;
    return r;
}

function flatBack(x, y)
{
    for(var i=0; i<x; i++)
    {
        for(var j=0; j<y; j++)
        {
            var tmp = new OBJ(0,
                new THREE.Vector3(1,1,1),
                new THREE.Vector3(i,0,j),
                new THREE.Vector3(0,0,0),
                objectContainer);
        }
    }
}
