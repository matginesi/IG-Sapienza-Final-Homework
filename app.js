
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

// THE GAME ITSELF (just like main() in c++)
var globalKeyPressed;
var game = new Game();
var globalMap = makeMap();
var snake;
var food;

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

    food = new Food(new THREE.Vector3(5,2,0));
    food.build();

    game.animate();
}

document.onkeydown = function checkKey(e)
{
    globalKeyPressed = (e || window.event).keyCode;
}


// Needed by Game class
var updateFunction = function ()
{
    snake.update();
    food.update();
    
    //globalKeyPressed = null;
    
}   