// TOGGLE enable-disable textures
var textureAttive = true;
var selectWorld;
var musicOn = true;

/*  selectWorld legenda:
    0 = land 
    1 = mars 
    2 = dark 
*/

document.getElementById("Landscape").onclick = function (event) {
    selectWorld = 0;
    console.log("User selected Landscape-Earth : ", selectWorld);
    chooseWorld(selectWorld);
    setTitles();
    main();
    game.music(0);  //landscape

}

document.getElementById("Mars").onclick = function (event) {
    selectWorld = 1;
    console.log("User selected Mars : ", selectWorld);
    chooseWorld(selectWorld);
    setTitles();
    main();
    game.music(1);	//mars

}

document.getElementById("Dark").onclick = function (event) {
    selectWorld = 2;
    console.log("User selected Dark : ", selectWorld);
    chooseWorld(selectWorld);
    setTitles();
    main();
    game.music(2);	//dark


}
var river, floor, albero, directory, snake, duck, cloud, cloudsmall, sheep;
var globalKeyPressed;
var delta = 0;


class Game {
    constructor() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new THREE.Scene();

        this.scoreCounter = document.getElementById('Score');
        this.lengthCounter = document.getElementById('Length');

        /*var loader = new THREE.TextureLoader();
		var bgTexture = loader.load('dg.jpg');
		this.scene.background = bgTexture;
        */
        this.scene.background = new THREE.Color(0x00);    // Dark black background


        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 200);
        this.camera.lookAt(this.scene.position);
        this.camera.position.set(-10, 20, -25);
        this.camera.rotation.y -= 30 / (2 * Math.PI);

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        document.body.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);

        this.mouseDown = false;

        this.timer = new THREE.Clock();
        this.timer.start();

        this.update = function dummyUpdate() { };

        this.boxes = [];

    }

    addLights() {
        var spotLight = new THREE.SpotLight(0xDDDDDD, 0.5);
        spotLight.castShadow = true;

        //Set up shadow properties for the light
        spotLight.position.set(10, 40, -20);
        spotLight.shadow.mapSize.width = 512;  // default
        spotLight.shadow.mapSize.height = 512; // default
        this.scene.add(spotLight);

        // Helper
        // const slh = new THREE.SpotLightHelper(spotLight);
        /// this.scene.add(slh);

        const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
        this.scene.add(light);

        // const lh = new THREE.HemisphereLightHelper(light);
        // this.scene.add(lh);

        var directLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directLight.castShadow = true;
        directLight.position.set(10,10,10);
        this.scene.add(directLight);

        // const dlh1 = new THREE.DirectionalLightHelper(directLight1);
        // this.scene.add(dlh1);
        /*
        const directLight2 = new THREE.DirectionalLight(0xffffff, 2);
        directLight2.castShadow = true;
        directLight2.position.set(-15.8, 5.2, 8);
        this.scene.add(directLight2);
        */
        
    }


    music(song) {
        var song;
        if (musicOn == true) {
            // create an AudioListener and add it to the camera
            var listener = new THREE.AudioListener();
            this.camera.add(listener);
            // create a global audio source
            var sound = new THREE.Audio(listener);
            // load a sound and set it as the Audio object's buffer
            var audioLoader = new THREE.AudioLoader();

            if (song == 0) { //LANDSCAPE
                audioLoader.load('sounds/hobbit-compressed.mp3', function (buffer) {
                    sound.setBuffer(buffer);
                    sound.setLoop(true);
                    sound.setVolume(0.5);
                    sound.play();
                });

            }
            if (song == 1) { //MARS
                audioLoader.load('sounds/odissea.mp3', function (buffer) {
                    sound.setBuffer(buffer);
                    sound.setLoop(true);
                    sound.setVolume(0.5);
                    sound.play();
                });
            }

            if (song == 2) { //DARK
                audioLoader.load('sounds/avengers-compressed.mp3', function (buffer) {
                    sound.setBuffer(buffer);
                    sound.setLoop(true);
                    sound.setVolume(0.5);
                    sound.play();
                });
            }
            if (song == 3) { //GAME OVER
                audioLoader.load('sounds/gameover.mp3', function (buffer) {
                    sound.setBuffer(buffer);
                    sound.setLoop(true);
                    sound.setVolume(0.5);
                    sound.play();
                });
            }
        }
    }

    /* Creates river.  */
    createRiver(dimX, dimY, dimZ, posY, posZ) {

        var lRiver, lRiverGeometry, lRiverMaterial, lRiverTex;

        lRiverGeometry = new THREE.BoxGeometry(dimX, dimY, dimZ);
        lRiverGeometry.receiveShadow = true;
        lRiverTex = applyTex(river, 0.5, 5);

        lRiverMaterial = new THREE.MeshBasicMaterial({ map: lRiverTex });
        lRiverMaterial.receiveShadow = true;
        lRiver = new THREE.Mesh(lRiverGeometry, lRiverMaterial);
        lRiver.receiveShadow = true;

        lRiver.position.y = posY;
        lRiver.position.z = posZ;

        this.scene.add(lRiver);

    }

    /* Creates texture for the floor.  */
    createFloorSx(dimX, dimY, dimZ, posX, posY, posZ) {

        var lFloor, lFloorGeometry, lFloorMaterial, lFloorTex;

        lFloorGeometry = new THREE.BoxGeometry(dimX, dimY, dimZ);
        lFloorGeometry.receiveShadow = true;
        lFloorTex = applyTex(floor, 8, 8);

        lFloorMaterial = new THREE.MeshBasicMaterial({ map: lFloorTex });
        lFloorMaterial.receiveShadow = true;
        lFloor = new THREE.Mesh(lFloorGeometry, lFloorMaterial);
        lFloor.receiveShadow = true;

        lFloor.position.x = posX;
        lFloor.position.y = posY;
        lFloor.position.z = posZ;

        this.scene.add(lFloor);

    }

    createFloorDx(dimX, dimY, dimZ, posX, posY, posZ) {

        var lFloor, lFloorGeometry, lFloorMaterial, lFloorTex;

        lFloorGeometry = new THREE.BoxGeometry(dimX, dimY, dimZ);
        lFloorGeometry.receiveShadow = true;
        lFloorTex = applyTex(floor, 8, 8);

        lFloorMaterial = new THREE.MeshBasicMaterial({ map: lFloorTex });
        lFloorMaterial.receiveShadow = true;
        lFloor = new THREE.Mesh(lFloorGeometry, lFloorMaterial);
        lFloor.receiveShadow = true;

        lFloor.position.x = posX;
        lFloor.position.y = posY;
        lFloor.position.z = posZ;

        this.scene.add(lFloor);

    }

    //Creazione di un oggetto immagine "albero" nel workspace
    createTrees() {

        var trees =
        {
            scaleX: 30, /* Trees are 64*64.  */
            scaleY: 30,

            posXRight: 20,
            posYRight: 15, /* + 32 = 64 / 2.  */
            posZRight: 0
        }
        var scr = /* Screen dimensions.  */
        {
            w: window.innerWidth,
            h: window.innerHeight
        }

        var i, tree;
        var treeTexture = THREE.ImageUtils.loadTexture(albero);

        var treeMaterial = new THREE.SpriteMaterial({
            map: treeTexture,
            useScreenCoordinates:
                false
        });

        for (i = 0; trees.posZRight - (i * 200) > -scr.w; i++) {
            //albero
            tree = new THREE.Sprite(treeMaterial);
            /* Use sprites so that
             * the trees will
             * always point to 
             * the camera.  */

            tree.position.set(trees.posXRight, trees.posYRight, trees.posZRight - (i * 400));
            tree.scale.set(trees.scaleX, trees.scaleY, 1.0);
            this.scene.add(tree);

        }

    }

    //Creazione di un oggetto immagine nel workspace
    createSat() {

        var sats =
        {
            scaleX: 5,
            scaleY: 5,

            posXRight: 20,
            posYRight: 10, /* + 32 = 64 / 2.  */
            posZRight: 0
        }
        var scr = /* Screen dimensions.  */
        {
            w: window.innerWidth,
            h: window.innerHeight
        }

        var i, sat;
        var satTexture = THREE.ImageUtils.loadTexture(satellite);

        var satMaterial = new THREE.SpriteMaterial({
            map: satTexture,
            useScreenCoordinates:
                false
        });

        for (i = 0; sats.posZRight - (i * 200) > -scr.w; i++) {
            //albero
            sat = new THREE.Sprite(satMaterial);
            /* Use sprites so that
             * the trees will
             * always point to 
             * the camera.  */

            sat.position.set(sats.posXRight, sats.posYRight, sats.posZRight - (i * 1400));
            sat.scale.set(sats.scaleX, sats.scaleY, 1.0);
            this.scene.add(sat);

        }

    }
    //Creazione di un oggetto immagine nel workspace
    createSkull() {

        var skus =
        {
            scaleX: 40,
            scaleY: 40,

            posXRight: 14,
            posYRight: 20, /* + 32 = 64 / 2.  */
            posZRight: 0
        }
        var scr = /* Screen dimensions.  */
        {
            w: window.innerWidth,
            h: window.innerHeight
        }

        var i, sku;
        var skuTexture = THREE.ImageUtils.loadTexture(teschio);

        var skuMaterial = new THREE.SpriteMaterial({
            map: skuTexture,
            useScreenCoordinates:
                false
        });

        for (i = 0; skus.posZRight - (i * 200) > -scr.w; i++) {
            //albero
            sku = new THREE.Sprite(skuMaterial);
            /* Use sprites so that
             * the trees will
             * always point to 
             * the camera.  */

            sku.position.set(skus.posXRight, skus.posYRight, skus.posZRight - (i * 1400));
            sku.scale.set(skus.scaleX, skus.scaleY, 1.0);
            this.scene.add(sku);

        }

    }


    /* Function that creates the skybox with 512*512 size pictures.  */
    createSkyBox() {

        var path, urls, textureCube, shader, skyMaterial, sky;

        path = directory;

        //front-px //back-nx //up-py //down-ny //right-pz //left-nz

        urls = [path + "front.jpg", path + "back.jpg", path + "up.jpg",
        path + "down.jpg", path + "right.jpg", path + "left.jpg"];

        textureCube = THREE.ImageUtils.loadTextureCube(urls);
        textureCube.format = THREE.RGBFormat;

        shader = THREE.ShaderLib.cube;
        shader.uniforms.tCube.value = textureCube;

        skyMaterial = new THREE.ShaderMaterial
            ({
                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader,
                uniforms: shader.uniforms,
                depthWrite: false,
                side: THREE.BackSide,
            });

        /*  Define the skybox: it's a cube 4096*4096*4096.  */
        sky = new THREE.Mesh(new THREE.BoxGeometry(4096, 4096, 4096), skyMaterial);


        this.scene.add(sky);

        if (selectWorld == 0) game.createTrees();

        if (selectWorld == 1) game.createSat();

        if (selectWorld == 2) game.createSkull();


    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.stats.begin();

        this.controls.update();

        this.stats.end();

        this.update();

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

// THE GAME ITSELF (just like main() in c++)
var game = new Game();
var globalMap = makeMap();

// removed window.onload to wait user to click
function main() {

    game.update = updateFunction;
    game.addLights();

    if (textureAttive) {
        game.createRiver(5, 0, 50, -0.4, 0);
        game.createFloorSx(20, 0, 50, 12.5, -0.4, 0);
        game.createFloorDx(20, 0, 50, -12.5, -0.4, 0);
        game.createSkyBox();

    }

    game.scene.add(globalMap);

    snake = new Snake(this.selectWorld);
    snake.buildHead();

    snake.addBlockEgg();
    snake.addBlockEgg();
    snake.addBlockEgg();

    egg = new Egg(new THREE.Vector3(0, 2, 10));
    egg.build();

    duck = new Duck(new THREE.Vector3(20, 2, 20));
    duck.build();

    sheep = new Sheep(new THREE.Vector3(0, 2, -20));
    sheep.build();

    cloud = new Cloud(new THREE.Vector3(0, 12, 0));
    cloud.build();
    cloudsmall = new Cloudsmall(new THREE.Vector3(0, 12, 0));
    cloudsmall.build();

    game.animate();
}

document.onkeydown = function checkKey(e) {
    globalKeyPressed = (e || window.event).keyCode;

    // [ E ] add edd
    if (globalKeyPressed == 69) egg.addEgg();
    // [ R ] add duck
    if (globalKeyPressed == 82) duck.addDuck();
    // T add sheep
    if (globalKeyPressed == 84) sheep.addSheep();

    // V add cloud
    //if (globalKeyPressed == 86) cloud.addCloud();


}

// Needed by Game class
var updateFunction = function () {

    // MATTEO collision box for map
    //var mapBB = new THREE.Box3().setFromObject(globalMap.Mesh.BoxGeometry);
    //mapBB.name = "mapBB";    
    //game.boxes.push(mapBB);
    //console.log(globalMap);
    //var mapHelper = new THREE.Box3Helper( mapHelper, 0xffff00 );
    //game.scene.add( mapHelper );

    delta += 0.5;

    snake.update();
    game.camera.lookAt(snake.getPosition());  //FOLLOWING

    egg.update();
    duck.update();
    sheep.update();
    cloud.update();
    cloudsmall.update();


    gameOver();

}


function gameOver() {
    if (snake.isDead == true) {
        snake.snakeGroup.visible = false;
        document.getElementById("GameoverTitle").style.visibility = 'visible';
        document.getElementById("Reset").style.visibility = 'visible';
        game.camera.position.z += 2;
        //sound.pause();

    }
}

function chooseWorld(selection) {
    if (selection == 0) {
        // landscape
        river = "textures/land/river.gif";
        floor = "textures/land/floor.jpg";
        albero = "textures/land/tree.png";
        directory = "textures/land/";


    }
    if (selection == 1) {
        // mars
        river = "textures/mars/river.jpg";
        floor = "textures/mars/floor.jpg";
        directory = "textures/mars/";
        satellite = "textures/mars/sat.png";
    }
    if (selection == 2) {
        // dark
        river = "textures/dark/river.jpg";
        floor = "textures/dark/floor.jpg";
        directory = "textures/dark/";
        teschio = "textures/dark/skull.png";
    }
}

function setTitles() {
    document.getElementById("Dragon").style.visibility = 'hidden';
    document.getElementById("Mars").style.visibility = 'hidden';
    document.getElementById("Landscape").style.visibility = 'hidden';
    document.getElementById("Dark").style.visibility = 'hidden';
    document.getElementById("Select").style.visibility = 'hidden';
    // document.getElementById("Commands").style.visibility = 'hidden';
    document.getElementById("intro-dark").style.visibility = 'hidden';
    document.getElementById("intro-earth").style.visibility = 'hidden';
    document.getElementById("intro-mars").style.visibility = 'hidden';
    document.getElementById("Score").style.visibility = 'visible';
    document.getElementById("Length").style.visibility = 'visible';
    
    document.getElementById("Music").style.visibility = 'visible';

}

function scoreUpdate(value) {
    document.getElementById("Score").innerHTML = "Score: " + value;
}
function lengthUpdate(value) {
    document.getElementById("Length").innerHTML = "Length: " + value;
}
function restart() {
    location.reload();
}

function randomPosition(max,min){
    return ( Math.random() * (max - min) + min ) ;
}

