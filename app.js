'use strict';

class Game
{
    constructor()
    {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x00 );    // Dark black background
        //this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        
        this.camera = new THREE.PerspectiveCamera( 75, this.width/this.height, 0.1, 200 );
        this.camera.lookAt(this.scene.position);
        this.camera.position.set(0, 3, -10);
        this.camera.rotation.y -= 30/(2*Math.PI);

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        document.body.appendChild( this.renderer.domElement );

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        this.stats = new Stats();
        this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( this.stats.dom );
        
        this.mouseDown = false;

        this.timer = new THREE.Clock();
        this.timer.start();

        this.update = function dummyUpdate() {};
    }

    
    addLights()
    {
        var spotLight = new THREE.SpotLight( 0xDDDDDD, 0.5);
        spotLight.castShadow = true;
        this.scene.add( spotLight );

        //Set up shadow properties for the light
        spotLight.position.set(10, 40, -20);
        spotLight.shadow.mapSize.width = 512;  // default
        spotLight.shadow.mapSize.height = 512; // default

        // Helper
        const slh = new THREE.SpotLightHelper( spotLight );
        this.scene.add(slh);
        
        const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
        this.scene.add(light);
        const lh = new THREE.HemisphereLightHelper( light );
        this.scene.add(lh);

        /*
        const directLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
        directLight1.castShadow = true;
        directLight1.position.set(9.5, 8.2, 8.3);
        this.scene.add(directLight1);
        const dlh1 = new THREE.DirectionalLightHelper( directLight1 );
        this.scene.add(dlh1);
        */

        /*
        const directLight2 = new THREE.DirectionalLight(0xffffff, 2);
        directLight2.castShadow = true;
        directLight2.position.set(-15.8, 5.2, 8);
        this.scene.add(directLight2);
        const dlh2 = new THREE.DirectionalLightHelper( directLight2 );
        this.scene.add(dlh2);
        */
    }

    animate()
    {
        requestAnimationFrame(this.animate.bind(this));
    
        this.stats.begin();
        
        this.controls.update();

        this.stats.end();
        
        this.update();

        this.render();
    }
    
    render()
    {    
        this.renderer.render(this.scene, this.camera);
    }
}

/*
document.onmousedown = function onMouseDown()
{ 
    // Only for debug
    //console.log("[onMouseDown()] Mouse button pressed.");
    //console.log("Button pressed: " + event.button);
    //console.log("At: " + event.clientX + ", " + event.clientY);
};

document.onmouseup = function onMouseUp()
{
    // Only for debug
    //console.log("[onMouseUp()] Mouse button release");
    //console.log("Button released: " + event.button)
    //console.log("At: " + event.clientX + ", " + event.clientY);
};
*/


// Random map generator
function makeMap()
{
    //var loader = new THREE.TextureLoader();
    //var texture = loader.load( 'https://images.template.net/wp-content/uploads/2016/04/26085855/Grass-Texture.jpg' );
    
    var mapGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
    
    var simplex = new SimplexNoise();
    for(var i=0; i<100; i++)
    {
        for(var j=0; j<100; j++)
        {
            mapGeometry.vertices[i+j*100].z = (
                (simplex.noise2D( i/100,j/100)) + 
                (simplex.noise2D( (i+200)/50,j/50)) + 
                (simplex.noise2D( (i+400)/25,j/25)) +
                (simplex.noise2D( (i+600)/12.5,j/12.5)) +
                (simplex.noise2D( (i+800)/6.25,j/6.25)) ) * 1.5;
        }
    }
    

    // map: texture,
    var mapMaterial = new THREE.MeshPhongMaterial({
        color: 0x5555FF, 
        wireframe: false,
        depthTest: true,
        side: THREE.FrontSide,
        flatShading: THREE.FlatShading
        });
        
    var map = new THREE.Mesh(mapGeometry, mapMaterial);
    
    map.rotation.x = -Math.PI/2;
    map.castShadow = true;
    map.receiveShadow = true;
    map.position.y = 0;
    map.name = "Terrain"
    
    return map;

}

// THE GAME ITSELF (just like main() in c++)
var globalEvent;
var game = new Game();
var globalMap = makeMap();
var snake;

window.onload = function main()
{
    game.update = updateFunction;
    game.addLights();

    game.scene.add(globalMap);
    
    snake = new Snake();
    snake.buildHead();
    snake.addBlock();
    snake.addBlock();
    snake.addBlock();
    snake.addBlock();
    snake.addBlock();

    game.animate();
}

class Snake
{
    constructor()
    {
        this.snakeLenght = 0;
        this.snakePosition = new THREE.Vector3(0, 2, 0);
        this.snakeRotation = new THREE.Vector3(0, 0, 0);

        this.snakeGroup = new THREE.Group();
        this.snakeGroup.name = "SnakeGroup";
        this.blockGeometry = new THREE.CubeGeometry(1, 1);
        this.blockMaterial = new THREE.MeshPhongMaterial({
            color: 0xAAFF55, 
            wireframe: false,
            depthTest: true,
        });
        this.rayCaster = new THREE.Raycaster();
    }

    buildHead()
    {
        this.snakeLenght = 0;
        
        this.snakeGroup.position.x = this.snakePosition.x;
        this.snakeGroup.position.y = this.snakePosition.y;
        this.snakeGroup.position.z = this.snakePosition.z;

        this.snakeGroup.rotation.x = this.snakeRotation.x;
        this.snakeGroup.rotation.y = this.snakeRotation.y;
        this.snakeGroup.rotation.z = this.snakeRotation.z;
        
        var headGeometry = new THREE.DodecahedronBufferGeometry(1);
        var headMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFF00, 
            wireframe: false,
            depthTest: true,
        });
        
        var headMesh = new THREE.Mesh(headGeometry, headMaterial);
        headMesh.castShadow = true;
        headMesh.receiveShadow = true;
        headMesh.name = "Snake:head";

        this.snakeGroup.add(headMesh);
        game.scene.add(this.snakeGroup);

        this.blocks = 1;
    }

    addBlock()
    {

        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.position.z = 1 - (1.2 * this.blocks);
        blockMesh.name = "Snake:Tail_" + this.blocks;

        this.snakeGroup.add(blockMesh);
        this.blocks++;
    }

    move(x, y, z)
    {

        this.snakeGroup.position.x += x;
        this.snakeGroup.position.y += y;
        this.snakeGroup.position.z += z;
        
        this.snakeGroup.children[0].rotation.x += Math.sin(x);
        this.snakeGroup.children[0].rotation.y += Math.sin(y);
        this.snakeGroup.children[0].rotation.z += Math.sin(z);

        for(var i=1; i<this.blocks; i++)
        {
            if(i%2)
            {
                this.snakeGroup.children[i].rotation.x -= Math.sin(x);
                this.snakeGroup.children[i].rotation.y -= Math.sin(y);
                this.snakeGroup.children[i].rotation.z -= Math.sin(z);
            }
            else
            {
                this.snakeGroup.children[i].rotation.x += Math.sin(x);
                this.snakeGroup.children[i].rotation.y += Math.sin(y);
                this.snakeGroup.children[i].rotation.z += Math.sin(z);
            }
        }
    }

    checkCollision()
    {
        // Check gravity
        var gravityDir = new THREE.Vector3(0, 0, 0);
        gravityDir.x = this.snakeGroup.position.x;
        gravityDir.y = - 1.5;
        gravityDir.z = this.snakeGroup.position.z;

        this.rayCaster.set(this.snakeGroup.position, gravityDir);
        var intersects = this.rayCaster.intersectObjects( game.scene.children );
        
        for(var i=0; i<intersects.length; i++)
        {
            if(intersects[i].object.name == "Terrain")
            {
                //console.log("Sbem! " + intersects.length);
                //this.move(0, -0.02, 0);
                if(intersects[i].distance < 2)
                    this.move(0, 0.1, 0);
                else
                    this.setPosition("y", 2);
                
                break;
            }
        }
    }

    setPosition(pos, value)
    {
        if(pos == "x")
            this.snakeGroup.position.x = value;

        if(pos == "y")
            this.snakeGroup.position.y = value;

        if(pos == "z")
            this.snakeGroup.position.z = value;
    }
};

document.onkeydown = function checkKey(e)
{
    globalEvent = (e || window.event).keyCode;
}


// Needed by Game class
var updateFunction = function ()
{
    snake.checkCollision();

    switch(globalEvent)
    {
        case(87):
            snake.move(0, 0, +0.1);
            break;

        case(83):
            snake.move(0, 0, -0.1);
            break;

        case(65):
            snake.move(-0.1, 0, 0);
            break;
        
        case(68):
            snake.move(0.1, 0, 0);
            break;

        default:
            break;
    }
    //globalEvent = null;
    
}   