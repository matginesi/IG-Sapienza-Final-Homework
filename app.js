var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer(antialias=true, precision="mediump");
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var globalBlockContainer = [];

function OBJ(type, dim, pos, rot, buffer)
{
    this.type = type;
    this.dim = dim;
    this.pos = pos;
    this.rot = rot;

    this.geometry = new THREE.BoxBufferGeometry(this.dim[0], this.dim[1], this.dim[2]);
    //this.geometry = new THREE.BoxGeometry(this.dim[0], this.dim[1], this.dim[2]);
    var col = 0xFFFFFF;

    switch(this.type)
    {
        case 0:
        default:
            switch(this.pos[1])
            {
                case(0):
                    col = 0x333333;
                break;

                case (1):
                case (2):
                case (3):
                    col = 0xBBAA00;
                break;
                case (4):
                case (5):
                    col = 0x10AA50;
                break;
                case (6):
                case (7):
                    col = 0xBB5010;
                break;
                
                default:
                    col = 0xDDDDDD;
                break;
            }

            
            this.material = new THREE.MeshPhongMaterial({
                    flatShading: THREE.FlatShading,
                    transparent: true,
                    opacity: 0.58
            });
            
            //this.material = new THREE.MeshLambertMaterial();  // faster!
            this.material.color.setHex( col );
        break;
    }
    
    this.cube = new THREE.Mesh( this.geometry, this.material );
    this.cube.position.set(this.pos[0], this.pos[1], this.pos[2]);
    this.cube.rotation.set(this.rot[0], this.rot[1], this.rot[2]);

    buffer.push(this.cube);
    this.ID = buffer.length;
}

//LIGHTNING
//first point light
light = new THREE.PointLight(0xffffff, 1, 4000);
light.position.set(0, 0, 0);
//the second one
light_two = new THREE.PointLight(0xffffff, 1, 4000);
light_two.position.set(-100, 800, 800);
//And another global lightning some sort of cripple GL
lightAmbient = new THREE.AmbientLight(0x404040);
scene.add(light, light_two, lightAmbient);

camera.position.set(30,30,30);
camera.rotation.set(0,0,0);
//camera.position.set( -30,30,30 );
//camera.rotation.order = 'YXZ';
//camera.rotation.y = - Math.PI / 4;
//camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );

var rndData = generatePerlinNoise(100, 100);
for(var i=0 in rndData) rndData[i] = Math.floor(0.6 + rndData[i] * 12);  
for(var i=0; i<100; i++)
{
    for(var j=0; j<100; j++)
    {
        var block = new OBJ(
            rndData[j + i*100],
            [1,1,1],
            [i, rndData[j + i*100], j],
            [0, 0, 0],
            globalBlockContainer);  
    }
}

for(var i=0; i<globalBlockContainer.length; i++)
    scene.add(globalBlockContainer[i]);


function animate()
{
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

var speed = 1;
document.onkeydown = function checkKey(e)
{
    e = e || window.event;

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
    
}

animate();
