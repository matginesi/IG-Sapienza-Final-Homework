'use strict';

var scene;
var camera;
var renderer;
var controls;
var stats;
var mouseDown;
var world;
//var night = false;

var sheep;
/*
let sheep,
    cloud,
    sky;
*/
var width;
var height;

function init()
{
    width = window.innerWidth,
    height = window.innerHeight;

    scene = new THREE.Scene();
    //camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 200 );
    camera.lookAt(scene.position);
    camera.position.set(0, 0.7, 8);

    renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.enableZoom = false;

    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );

    addLights();
    drawSheep();
    //drawCloud();
    //drawSky();

    var m = new Map(30, 30, -1.0);
    scene.add(m.group);

    //world = document.querySelector('.world');
    //world.appendChild(renderer.domElement);

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    //document.addEventListener('touchstart', onTouchStart);
    //document.addEventListener('touchend', onTouchEnd);
    //window.addEventListener('resize', onResize);
}

function drawSheep()
{
    sheep = new Sheep();
    scene.add(sheep.group);
}

function addLights()
{
  const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
  scene.add(light);

  const directLight1 = new THREE.DirectionalLight(0xffd798, 0.8);
  directLight1.castShadow = true;
  directLight1.position.set(9.5, 8.2, 8.3);
  scene.add(directLight1);

  const directLight2 = new THREE.DirectionalLight(0xc9ceff, 0.5);
  directLight2.castShadow = true;
  directLight2.position.set(-15.8, 5.2, 8);
  scene.add(directLight2);
}

function onMouseDown(event) {   mouseDown = true;   }  
function onMouseUp() {  mouseDown = false;  }  

function rad(degrees) { return degrees * (Math.PI / 180);   }

function animate()
{
    requestAnimationFrame(animate);
  
    stats.begin();

    //if (sheep.group.position.y > 0.4) cloudcloud.bend();
    //sky.moveSky();
    
    controls.update();

    stats.end();
    
    render();
}
  
function render()
{ 
    sheep.jumpOnMouseDown();
   
    renderer.render(scene, camera);
}

class Sheep
{
    constructor()
    {
        this.group = new THREE.Group();
        //this.group.position.y = 0.4;
        this.group.position.set(0, 0, 0.4);

        this.woolMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 1,
        flatShading: THREE.FlatShading
        });
        this.skinMaterial = new THREE.MeshStandardMaterial({
        color: 0xffaf8b,
        roughness: 1,
        flatShading: THREE.FlatShading
        });
        this.darkMaterial = new THREE.MeshStandardMaterial({
        color: 0x4b4553,
        roughness: 1,
        flatShading: THREE.FlatShading
        });

        this.vAngle = 0;

        this.drawBody();
        this.drawHead();
        this.drawLegs();
    }

    drawBody()
    {
        const bodyGeometry = new THREE.IcosahedronGeometry(1.7, 0);
        const body = new THREE.Mesh(bodyGeometry, this.woolMaterial);
        body.castShadow = true;
        body.receiveShadow = true;
        this.group.add(body);
    }

    drawHead()
    {
        const head = new THREE.Group();
        head.position.set(0, 0.65, 1.6);
        head.rotation.x = rad(-20);
        this.group.add(head);

        const foreheadGeometry = new THREE.BoxGeometry(0.7, 0.6, 0.7);
        const forehead = new THREE.Mesh(foreheadGeometry, this.skinMaterial);
        forehead.castShadow = true;
        forehead.receiveShadow = true;
        forehead.position.y = -0.15;
        head.add(forehead);

        const faceGeometry = new THREE.CylinderGeometry(0.5, 0.15, 0.4, 4, 1);
        const face = new THREE.Mesh(faceGeometry, this.skinMaterial);
        face.castShadow = true;
        face.receiveShadow = true;
        face.position.y = -0.65;
        face.rotation.y = rad(45);
        head.add(face);

        const woolGeometry = new THREE.BoxGeometry(0.84, 0.46, 0.9);
        const wool = new THREE.Mesh(woolGeometry, this.woolMaterial);
        wool.position.set(0, 0.12, 0.07);
        wool.rotation.x = rad(20);
        head.add(wool);

        const rightEyeGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.06, 6);
        const rightEye = new THREE.Mesh(rightEyeGeometry, this.darkMaterial);
        rightEye.castShadow = true;
        rightEye.receiveShadow = true;
        rightEye.position.set(0.35, -0.48, 0.33);
        rightEye.rotation.set(rad(130.8), 0, rad(-45));
        head.add(rightEye);

        const leftEye = rightEye.clone();
        leftEye.position.x = -rightEye.position.x;
        leftEye.rotation.z = -rightEye.rotation.z;
        head.add(leftEye);

        const rightEarGeometry = new THREE.BoxGeometry(0.12, 0.5, 0.3);
        rightEarGeometry.translate(0, -0.25, 0);
        this.rightEar = new THREE.Mesh(rightEarGeometry, this.skinMaterial);
        this.rightEar.castShadow = true;
        this.rightEar.receiveShadow = true;
        this.rightEar.position.set(0.35, -0.12, -0.07);
        this.rightEar.rotation.set(rad(20), 0, rad(50));
        head.add(this.rightEar);

        this.leftEar = this.rightEar.clone();
        this.leftEar.position.x = -this.rightEar.position.x;
        this.leftEar.rotation.z = -this.rightEar.rotation.z;
        head.add(this.leftEar);
    }

    drawLegs()
    {
        const legGeometry = new THREE.CylinderGeometry(0.3, 0.15, 1, 4);
        legGeometry.translate(0, -0.5, 0);
        this.frontRightLeg = new THREE.Mesh(legGeometry, this.darkMaterial);
        this.frontRightLeg.castShadow = true;
        this.frontRightLeg.receiveShadow = true;
        this.frontRightLeg.position.set(0.7, -0.8, 0.5);
        this.frontRightLeg.rotation.x = rad(-12);
        this.group.add(this.frontRightLeg);

        this.frontLeftLeg = this.frontRightLeg.clone();
        this.frontLeftLeg.position.x = -this.frontRightLeg.position.x;
        this.frontLeftLeg.rotation.z = -this.frontRightLeg.rotation.z;
        this.group.add(this.frontLeftLeg);

        this.backRightLeg = this.frontRightLeg.clone();
        this.backRightLeg.position.z = -this.frontRightLeg.position.z;
        this.backRightLeg.rotation.x = -this.frontRightLeg.rotation.x;
        this.group.add(this.backRightLeg);

        this.backLeftLeg = this.frontLeftLeg.clone();
        this.backLeftLeg.position.z = -this.frontLeftLeg.position.z;
        this.backLeftLeg.rotation.x = -this.frontLeftLeg.rotation.x;
        this.group.add(this.backLeftLeg);
    }

    jump(speed)
    {
        this.vAngle += speed;
        this.group.position.y = Math.sin(this.vAngle) + 1.38;

        const legRotation = Math.sin(this.vAngle) * Math.PI / 6 + 0.4;

        this.frontRightLeg.rotation.z = legRotation;
        this.backRightLeg.rotation.z = legRotation;
        this.frontLeftLeg.rotation.z = -legRotation;
        this.backLeftLeg.rotation.z = -legRotation;

        const earRotation = Math.sin(this.vAngle) * Math.PI / 3 + 1.5;

        this.rightEar.rotation.z = earRotation;
        this.leftEar.rotation.z = -earRotation;
    }
    
    jumpOnMouseDown()
    {
        if (mouseDown) this.jump(0.05);
        else
        {
            if (this.group.position.y <= 0.4) return;
            this.jump(0.08);
        }
    }
}

class Map
{
    constructor(width, height, level)
    {
        this.blocks = [];
        this.width = width;
        this.height = height;
        this.level = level;

        this.group = new THREE.Group();
        this.group.position.set(-this.width/2, this.level, -this.height/2);

        // Simple gray block
        this.simpleBlock = new THREE.MeshLambertMaterial(
            {
                color: 0xAAAAAA,
                flatShading: THREE.FlatShading
            });

        // Simple red block
        this.redBlock = new THREE.MeshLambertMaterial(
            {
                color: 0xFF0000,
                flatShading: THREE.FlatShading
            });

        var blocks = [];

        this.makeMap();
    }

    makeMap()
    {
        var rndMapData = generatePerlinNoise(this.width, this.height);
        const blockGeometry = new THREE.BoxBufferGeometry(1,1,1);
        var blockMesh;

        for(var i=0; i<this.width; i++)
        {
            for(var j=0; j<this.height; j++)
            {
                var tmp = Math.floor( 2 * rndMapData[XYtoValue(i, j, this.width, this.height)] );
                switch(tmp)
                {
                    case (0):
                        blockMesh = new THREE.Mesh( blockGeometry, this.simpleBlock);
                    break;

                    case (1):
                    default:
                        blockMesh = new THREE.Mesh( blockGeometry, this.redBlock);
                    break;
                }
                

                blockMesh.position.x = i; //-width/2 + i;
                blockMesh.position.y = this.level;
                blockMesh.position.z = j; //-height/2 + j;

                blockMesh.castShadow = true;
                blockMesh.receiveShadow = true;
                this.group.add(blockMesh);

                var data = {
                    position: {x: -this.width/2 + i, y: this.level, z: -this.height/2 + j},
                    type: tmp,
                    id: this.blocks.length
                };
                
                this.blocks.push(data);
            }     
        }
    }
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
console.log(valueToXY(7, 6, 5));
console.log(XYtoValue(1,1,6,5));

init();
animate();