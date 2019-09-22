var move = 0.15; // velocity of snake (used in moveHead)
var skinFile, headFile;
var updown = true;

class Snake {
    constructor(selectWorld) {

        this.selectWorld = selectWorld;

        chooseTexture();

        this.isDead = false;

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
            castShadow: true,
            receiveShadow: true,

        });

        this.whiteMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            wireframe: false,
            depthTest: true,
            castShadow: true,
            receiveShadow: true,


        });

        this.blackMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000,
            wireframe: false,
            depthTest: true,
            castShadow: true,
            receiveShadow: true,


        });

        this.redMaterial = new THREE.MeshPhongMaterial({
            color: 0xB22222,
            wireframe: false,
            depthTest: true,
            castShadow: true,
            receiveShadow: true,

        });
        this.rayCaster = new THREE.Raycaster();

        // initially snake is oriented vs positive Z axis
        this.snakeDirection = new THREE.Vector3(0, 0, 1);

        this.score = 0;
        this.length = -3;
    }

    buildHead() {
        this.snakeLenght = 0;

        this.snakeGroup.position.x = this.snakePosition.x;
        this.snakeGroup.position.y = this.snakePosition.y;
        this.snakeGroup.position.z = this.snakePosition.z;

        this.snakeGroup.rotation.x = this.snakeRotation.x;
        this.snakeGroup.rotation.y = this.snakeRotation.y;
        this.snakeGroup.rotation.z = this.snakeRotation.z;

        const head = new THREE.Group();
        head.position.set(0, 0.61, 0.5);
        head.rotation.set(0, 0, 0);
        this.snakeGroup.add(head);

        var headTexture = new THREE.TextureLoader().load(headFile);
        this.skinMaterial = new THREE.MeshBasicMaterial({ map: headTexture });
        if (!textureAttive) this.skinMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffff00 });


        // const faceGeometryBIG = new THREE.BoxGeometry(1.5, 1.5, 1.5);       
        const faceGeometryBIG = new THREE.CylinderGeometry(1, 1.2, 1.5, 5);
        const faceBIG = new THREE.Mesh(faceGeometryBIG, this.skinMaterial);
        faceBIG.castShadow = true;
        faceBIG.receiveShadow = true;
        faceBIG.position.set(0, -0.2, -1.2);
        faceBIG.rotation.set(1.55, 0, 0);
        head.add(faceBIG);


        // Ear (children[0].childer[1 e 2])
        const faceGeometryEARRIGHT = new THREE.BoxGeometry(0.15, 0.7, 2);
        const faceEARRIGHT = new THREE.Mesh(faceGeometryEARRIGHT, this.skinMaterial);
        faceEARRIGHT.castShadow = true;
        faceEARRIGHT.receiveShadow = true;
        faceEARRIGHT.position.set(0.8, -0.3, -1.2);
        faceEARRIGHT.rotation.set(-0.3, -0.7, 0);
        head.add(faceEARRIGHT);



        const faceGeometryEARLEFT = new THREE.BoxGeometry(0.15, 0.7, 2);
        const faceEARLEFT = new THREE.Mesh(faceGeometryEARLEFT, this.skinMaterial);
        faceEARLEFT.castShadow = true;
        faceEARLEFT.receiveShadow = true;
        faceEARLEFT.position.set(-0.8, -0.3, -1.2);
        faceEARLEFT.rotation.set(0.3, 0.7, 0);
        head.add(faceEARLEFT);



        // Horns - Head       

        const faceGeometryHORNbackRIGHT = new THREE.ConeGeometry(0.2, 1.2, 32);
        const hornbackRIGHT = new THREE.Mesh(faceGeometryHORNbackRIGHT, this.whiteMaterial);
        hornbackRIGHT.castShadow = true;
        hornbackRIGHT.receiveShadow = true;
        hornbackRIGHT.position.set(0.7, 0.85, -1.9);
        hornbackRIGHT.rotation.set(-0.5, 0, -0.5);
        head.add(hornbackRIGHT);

        const faceGeometryHORNbackLEFT = new THREE.ConeGeometry(0.2, 1.2, 32);
        const hornbackLEFT = new THREE.Mesh(faceGeometryHORNbackLEFT, this.whiteMaterial);
        hornbackLEFT.castShadow = true;
        hornbackLEFT.receiveShadow = true;
        hornbackLEFT.position.set(-0.7, 0.85, -1.9);
        hornbackLEFT.rotation.set(-0.5, 0, 0.5);
        head.add(hornbackLEFT);


        // Squame    (children[0].childer[5 e 6 e 7])       
        const faceGeometrySQUAME1 = new THREE.BoxGeometry(0.2, 0.5, 0.5);
        const faceSQUAME1 = new THREE.Mesh(faceGeometrySQUAME1, this.redMaterial);
        faceSQUAME1.castShadow = true;
        faceSQUAME1.receiveShadow = true;
        faceSQUAME1.position.set(0, 0.57, -0.85);
        faceSQUAME1.rotation.set(0.77, 0, 0);
        head.add(faceSQUAME1);


        const faceGeometrySQUAME2 = new THREE.BoxGeometry(0.2, 0.5, 0.5);
        const faceSQUAME2 = new THREE.Mesh(faceGeometrySQUAME2, this.redMaterial);
        faceSQUAME2.castShadow = true;
        faceSQUAME2.receiveShadow = true;
        faceSQUAME2.position.set(0, 0.67, -1.2);
        faceSQUAME2.rotation.set(0.77, 0, 0);
        head.add(faceSQUAME2);



        const faceGeometrySQUAME3 = new THREE.BoxGeometry(0.2, 0.5, 0.5);
        const faceSQUAME3 = new THREE.Mesh(faceGeometrySQUAME3, this.redMaterial);
        faceSQUAME3.castShadow = true;
        faceSQUAME3.receiveShadow = true;
        faceSQUAME3.position.set(0, 0.77, -1.55);
        faceSQUAME3.rotation.set(0.77, 0, 0);
        head.add(faceSQUAME3);



        // Mouth   (children[0].childer[8 e 9])
        const faceGeometryUP = new THREE.BoxGeometry(1, 0.4, 2.5);
        const faceUP = new THREE.Mesh(faceGeometryUP, this.skinMaterial);
        faceUP.castShadow = true;
        faceUP.receiveShadow = true;
        faceUP.position.z = -0.2;
        faceUP.position.y = -0.3;
        faceUP.rotation.set(0, 0, 0);
        head.add(faceUP);


        const faceGeometryDOWN = new THREE.BoxGeometry(1, 0.2, 2);
        const faceDOWN = new THREE.Mesh(faceGeometryDOWN, this.skinMaterial);
        faceDOWN.castShadow = true;
        faceDOWN.receiveShadow = true;
        faceDOWN.position.set(0, -0.8, -0.25);
        faceDOWN.rotation.set(0, 0, 0);
        head.add(faceDOWN);


        // Horn - Mouth 



        const faceGeometryHORNfrontRIGHT = new THREE.ConeGeometry(0.1, 0.42, 32);
        const hornfrontRIGHT = new THREE.Mesh(faceGeometryHORNfrontRIGHT, this.whiteMaterial);
        hornfrontRIGHT.castShadow = true;
        hornfrontRIGHT.receiveShadow = true;
        hornfrontRIGHT.position.set(0.45, 0.35, 1.25);
        hornfrontRIGHT.rotation.set(0.5, 0, -0.5);
        faceUP.add(hornfrontRIGHT);

        const faceGeometryHORNfrontLEFT = new THREE.ConeGeometry(0.1, 0.42, 32);
        const hornfrontLEFT = new THREE.Mesh(faceGeometryHORNfrontLEFT, this.whiteMaterial);
        hornfrontLEFT.castShadow = true;
        hornfrontLEFT.receiveShadow = true;
        hornfrontLEFT.position.set(-0.45, 0.35, 1.25);
        hornfrontLEFT.rotation.set(0.5, 0, 0.5);
        faceUP.add(hornfrontLEFT);


        const faceGeometryHORNfrontBIG = new THREE.ConeGeometry(0.11, 0.50, 32);
        const hornfrontBIG = new THREE.Mesh(faceGeometryHORNfrontBIG, this.whiteMaterial);
        hornfrontBIG.castShadow = true;
        hornfrontBIG.receiveShadow = true;
        hornfrontBIG.position.set(0, -0.15, 1.2);
        hornfrontBIG.rotation.set(8.5, 0, 0);
        faceDOWN.add(hornfrontBIG);

        // Tooths        
        const toothGeometryRIGHT = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothRIGHT = new THREE.Mesh(toothGeometryRIGHT, this.whiteMaterial);
        toothRIGHT.castShadow = true;
        toothRIGHT.receiveShadow = true;
        toothRIGHT.position.set(0.4, 0.2, 0.5);
        faceDOWN.add(toothRIGHT);

        const toothGeometryLEFT = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothLEFT = new THREE.Mesh(toothGeometryLEFT, this.whiteMaterial);
        toothLEFT.castShadow = true;
        toothLEFT.receiveShadow = true;
        toothLEFT.position.set(-0.4, 0.2, 0.5);
        faceDOWN.add(toothLEFT);


        const toothGeometryRIGHT1 = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothRIGHT1 = new THREE.Mesh(toothGeometryRIGHT1, this.whiteMaterial);
        toothRIGHT1.castShadow = true;
        toothRIGHT1.receiveShadow = true;
        toothRIGHT1.position.set(0.4, 0.2, 0.7);
        faceDOWN.add(toothRIGHT1);

        const toothGeometryLEFT1 = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothLEFT1 = new THREE.Mesh(toothGeometryLEFT1, this.whiteMaterial);
        toothLEFT1.castShadow = true;
        toothLEFT1.receiveShadow = true;
        toothLEFT1.position.set(-0.4, 0.2, 0.7);
        faceDOWN.add(toothLEFT1);



        const toothGeometryRIGHT2 = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothRIGHT2 = new THREE.Mesh(toothGeometryRIGHT2, this.whiteMaterial);
        toothRIGHT2.castShadow = true;
        toothRIGHT2.receiveShadow = true;
        toothRIGHT2.position.set(0.4, 0.2, 0.9);
        faceDOWN.add(toothRIGHT2);

        const toothGeometryLEFT2 = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothLEFT2 = new THREE.Mesh(toothGeometryLEFT2, this.whiteMaterial);
        toothLEFT2.castShadow = true;
        toothLEFT2.receiveShadow = true;
        toothLEFT2.position.set(-0.4, 0.2, 0.9);
        faceDOWN.add(toothLEFT2);


        const toothGeometryRIGHT3 = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothRIGHT3 = new THREE.Mesh(toothGeometryRIGHT3, this.whiteMaterial);
        toothRIGHT3.castShadow = true;
        toothRIGHT3.receiveShadow = true;
        toothRIGHT3.position.set(0.2, 0.2, 0.9);
        faceDOWN.add(toothRIGHT3);

        const toothGeometryLEFT3 = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothLEFT3 = new THREE.Mesh(toothGeometryLEFT3, this.whiteMaterial);
        toothLEFT3.castShadow = true;
        toothLEFT3.receiveShadow = true;
        toothLEFT3.position.set(-0.2, 0.2, 0.9);
        faceDOWN.add(toothLEFT3);

        const toothGeometryLEFTCENTRAL = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothLEFTCENTRAL = new THREE.Mesh(toothGeometryLEFTCENTRAL, this.whiteMaterial);
        toothLEFTCENTRAL.castShadow = true;
        toothLEFTCENTRAL.receiveShadow = true;
        toothLEFTCENTRAL.position.set(0, 0.2, 0.9);
        faceDOWN.add(toothLEFTCENTRAL);



        const toothGeometryRIGHTUP = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothRIGHTUP = new THREE.Mesh(toothGeometryRIGHTUP, this.whiteMaterial);
        toothRIGHTUP.castShadow = true;
        toothRIGHTUP.receiveShadow = true;
        toothRIGHTUP.position.set(0.4, -0.3, 0.7);
        toothRIGHTUP.rotation.set(3.14, 0, 0);
        faceUP.add(toothRIGHTUP);

        const toothGeometryLEFTUP = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothLEFTUP = new THREE.Mesh(toothGeometryLEFTUP, this.whiteMaterial);
        toothLEFTUP.castShadow = true;
        toothLEFTUP.receiveShadow = true;
        toothLEFTUP.position.set(-0.4, -0.3, 0.7);
        toothLEFTUP.rotation.set(3.14, 0, 0);
        faceUP.add(toothLEFTUP);


        const toothGeometryRIGHTUP1 = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothRIGHTUP1 = new THREE.Mesh(toothGeometryRIGHTUP1, this.whiteMaterial);
        toothRIGHTUP1.castShadow = true;
        toothRIGHTUP1.receiveShadow = true;
        toothRIGHTUP1.position.set(0.4, -0.3, 0.9);
        toothRIGHTUP1.rotation.set(3.14, 0, 0);
        faceUP.add(toothRIGHTUP1);

        const toothGeometryLEFTUP1 = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothLEFTUP1 = new THREE.Mesh(toothGeometryLEFTUP1, this.whiteMaterial);
        toothLEFTUP1.castShadow = true;
        toothLEFTUP1.receiveShadow = true;
        toothLEFTUP1.position.set(-0.4, -0.3, 0.9);
        toothLEFTUP1.rotation.set(3.14, 0, 0);
        faceUP.add(toothLEFTUP1);



        const toothGeometryRIGHTUP2 = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothRIGHTUP2 = new THREE.Mesh(toothGeometryRIGHTUP2, this.whiteMaterial);
        toothRIGHTUP2.castShadow = true;
        toothRIGHTUP2.receiveShadow = true;
        toothRIGHTUP2.position.set(0.4, -0.3, 1.1);
        toothRIGHTUP2.rotation.set(3.14, 0, 0);
        faceUP.add(toothRIGHTUP2);

        const toothGeometryLEFTUP2 = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothLEFTUP2 = new THREE.Mesh(toothGeometryLEFTUP2, this.whiteMaterial);
        toothLEFTUP2.castShadow = true;
        toothLEFTUP2.receiveShadow = true;
        toothLEFTUP2.position.set(-0.4, -0.3, 1.1);
        toothLEFTUP2.rotation.set(3.14, 0, 0);
        faceUP.add(toothLEFTUP2);


        const toothGeometryRIGHTUP3 = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothRIGHTUP3 = new THREE.Mesh(toothGeometryRIGHTUP3, this.whiteMaterial);
        toothRIGHTUP3.castShadow = true;
        toothRIGHTUP3.receiveShadow = true;
        toothRIGHTUP3.position.set(0.2, -0.3, 1.1);
        toothRIGHTUP3.rotation.set(3.14, 0, 0);
        faceUP.add(toothRIGHTUP3);

        const toothGeometryLEFTUP3 = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothLEFTUP3 = new THREE.Mesh(toothGeometryLEFTUP3, this.whiteMaterial);
        toothLEFTUP3.castShadow = true;
        toothLEFTUP3.receiveShadow = true;
        toothLEFTUP3.position.set(-0.2, -0.3, 1.1);
        toothLEFTUP3.rotation.set(3.14, 0, 0);
        faceUP.add(toothLEFTUP3);

        const toothGeometryLEFTUPCENTRAL = new THREE.ConeGeometry(0.05, 0.2, 32);
        const toothLEFTUPCENTRAL = new THREE.Mesh(toothGeometryLEFTUPCENTRAL, this.whiteMaterial);
        toothLEFTUPCENTRAL.castShadow = true;
        toothLEFTUPCENTRAL.receiveShadow = true;
        toothLEFTUPCENTRAL.position.set(0, -0.3, 1.1);
        toothLEFTUPCENTRAL.rotation.set(3.14, 0, 0);
        faceUP.add(toothLEFTUPCENTRAL);

        const tongueGeometry = new THREE.SphereGeometry(0.5, 3, 6, 1.2, 0.8, 2.5, 2.6);
        const tongue = new THREE.Mesh(tongueGeometry, this.redMaterial);
        tongue.castShadow = true;
        tongue.receiveShadow = true;
        tongue.position.set(0, 0, 0.3);
        tongue.rotation.set(0, 0, 0);
        faceUP.add(tongue);


        // Eye  (children[0].childer[10 e 11])
        const eyeGeometryRIGHT = new THREE.SphereGeometry(0.15, 0.15, 0.15);
        const eyeRIGHT = new THREE.Mesh(eyeGeometryRIGHT, this.whiteMaterial);
        eyeRIGHT.castShadow = true;
        eyeRIGHT.receiveShadow = true;
        eyeRIGHT.position.set(0.5, 0.2, -0.45);
        eyeRIGHT.rotation.set(1.65, 0, 0);
        head.add(eyeRIGHT);

        const eyeGeometryLEFT = new THREE.SphereGeometry(0.15, 0.15, 0.15);
        const eyeLEFT = new THREE.Mesh(eyeGeometryLEFT, this.whiteMaterial);
        eyeLEFT.castShadow = true;
        eyeLEFT.receiveShadow = true;
        eyeLEFT.position.set(-0.5, 0.2, -0.45);
        eyeLEFT.rotation.set(1.65, 0, 0);
        head.add(eyeLEFT);

        // Pupil 
        const pupilGeometryRIGHT = new THREE.SphereGeometry(0.05, 0.05, 0.05);
        const pupilRIGHT = new THREE.Mesh(pupilGeometryRIGHT, this.blackMaterial);
        pupilRIGHT.castShadow = true;
        pupilRIGHT.receiveShadow = true;
        pupilRIGHT.position.set(0.05, 0.15, 0);
        eyeRIGHT.add(pupilRIGHT);

        const pupilGeometryLEFT = new THREE.SphereGeometry(0.05, 0.05, 0.05);
        const pupilLEFT = new THREE.Mesh(pupilGeometryLEFT, this.blackMaterial);
        pupilLEFT.castShadow = true;
        pupilLEFT.receiveShadow = true;
        pupilLEFT.position.set(0.05, 0.15, 0);
        eyeLEFT.add(pupilLEFT);


        // Nose 
        const noseGeometryBIG = new THREE.BoxGeometry(0.4, 0.3, 2);
        const noseBIG = new THREE.Mesh(noseGeometryBIG, this.skinMaterial);
        noseBIG.castShadow = true;
        noseBIG.receiveShadow = true;
        noseBIG.position.set(0, 0.3, 0);
        faceUP.add(noseBIG);


        const noseGeometryRIGHT = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8);
        const nosefaceRIGHT = new THREE.Mesh(noseGeometryRIGHT, this.blackMaterial);
        nosefaceRIGHT.castShadow = true;
        nosefaceRIGHT.receiveShadow = true;
        nosefaceRIGHT.position.set(0.1, 0, 0.93);
        nosefaceRIGHT.rotation.set(1.65, 0, 0);
        noseBIG.add(nosefaceRIGHT);

        const noseGeometryLEFT = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8);
        const nosefaceLEFT = new THREE.Mesh(noseGeometryLEFT, this.blackMaterial);
        nosefaceLEFT.castShadow = true;
        nosefaceLEFT.receiveShadow = true;
        nosefaceLEFT.position.set(-0.1, 0, 0.93);
        nosefaceLEFT.rotation.set(1.65, 0, 0);
        noseBIG.add(nosefaceLEFT);


        game.scene.add(this.snakeGroup);
        this.blocks = 1;
    }

    addBlock() {

        // not used anymore

        //TEXTURE
        var bodyTexture = new THREE.TextureLoader().load(skinFile);

        var materiale = new THREE.MeshBasicMaterial({ map: bodyTexture });
        var blockMesh = new THREE.Mesh(this.blockGeometry, materiale);

        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.position.z = - (1.1 * this.blocks);

        blockMesh.name = "Snake:Tail_" + this.blocks;

        this.snakeGroup.add(blockMesh);
        this.blocks++;

    }

    addBlockEgg() {

        //TEXTURE
        var bodyTexture = new THREE.TextureLoader().load(skinFile);

        var materiale = new THREE.MeshBasicMaterial({ map: bodyTexture });
        if (!textureAttive) materiale = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffff00 });

        var blockMesh = new THREE.Mesh(this.blockGeometry, materiale);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;

        /*
            per risolvere il problema di quel bug che si vede quando si aggiunge un blocco
            ho impostato che il blocco viene aggiunto "far away in the galaxy"
            cosi poi quando ci si muove la testa li richiama tutti a se
        */

        // console.log("Snake lenght: ", this.blocks);
        var lastNode = Number(this.blocks);

        blockMesh.position.x = this.snakeGroup.children[lastNode - 1].position.x - this.snakeDirection.x * 1.1;
        blockMesh.position.y = this.snakeGroup.children[lastNode - 1].position.y - this.snakeDirection.y * 1.1;
        blockMesh.position.z = this.snakeGroup.children[lastNode - 1].position.z - this.snakeDirection.z * 1.1;

        blockMesh.name = "Snake:Tail_" + this.blocks;

        this.snakeGroup.add(blockMesh);
        this.blocks++;

        this.length += 1;

        scoreUpdate(this.score);
        lengthUpdate(this.length);

    }
    redRemoveBlock() {

        // la testa non può essere cancellata
        if (this.blocks > 4) {
            this.blocks--;
            this.snakeGroup.remove(this.snakeGroup.children[this.blocks]);
            this.score -= 10;
            this.length -= 1;

            globalKeyPressed = null;
            scoreUpdate(this.score);
            lengthUpdate(this.length);
        }

    }

    redAlert() {

        // quando snake perde un blocco il suo corpo per un secondo è red

        // TO-DO
    }

    swag(delta) {

        /* 
            non è piu' usato, l' effetto è ottenuto dentro updateBody
        */

        for (var i = 1; i < this.blocks; i++) {

            if (this.isEqual(this.snakeDirection, [0, 0, 1]) || this.isEqual(this.snakeDirection, [0, 0, -1]))
                this.snakeGroup.children[i].position.x = Math.cos(delta / 7 + i) / 8;

            if (this.isEqual(this.snakeDirection, [0, 1, 0]) || this.isEqual(this.snakeDirection, [0, -1, 0]))
                this.snakeGroup.children[i].position.y = Math.cos(delta / 7 + i) / 8;

            if (this.isEqual(this.snakeDirection, [1, 0, 0]) || this.isEqual(this.snakeDirection, [1, 0, 0]))
                this.snakeGroup.children[i].position.z = Math.cos(delta / 7 + i) / 8;
        }

    }

    setOrientation(x, y, z) {

        this.snakeDirection = new THREE.Vector3(x, y, z);

        /*
            Questa sezione qui sotto serve a capire come girare la testa
            in base alla direzione del movimento
        */

        if (z != 0) {
            this.snakeGroup.children[0].rotation.z = 0;
            this.snakeGroup.children[0].rotation.y = (1 - z) * Math.PI / 2;
            this.snakeGroup.children[0].rotation.x = 0;
        }

        if (x != 0) {
            this.snakeGroup.children[0].rotation.z = 0;
            this.snakeGroup.children[0].rotation.y = x * Math.PI / 2;
            this.snakeGroup.children[0].rotation.x = 0;
        }

        if (y != 0) {
            this.snakeGroup.children[0].rotation.z = 0;
            this.snakeGroup.children[0].rotation.x = -y * Math.PI / 2;
            this.snakeGroup.children[0].rotation.y = 0;
        }

    }

    rotation() {

        this.snakeGroup.children[0].rotation.x += Math.sin(1) / 20;
        this.snakeGroup.children[0].rotation.y += Math.sin(1) / 20;
        this.snakeGroup.children[0].rotation.z += Math.sin(1) / 20;

    }

    moveHead(x, y, z) {
        /*
            Impartisce i comandi alla testa
            Aggiunto per pulizia e per usi futuri (if WallHit then goRight)  
        */


        this.snakeGroup.children[0].position.x += x;
        this.snakeGroup.children[0].position.y += y;
        this.snakeGroup.children[0].position.z += z;

        if (updown) {
            this.snakeGroup.children[0].children[8].rotation.x += -0.02;  //mouth UP
            this.snakeGroup.children[0].children[9].rotation.x += 0.02;   //mouth DOWN
            this.snakeGroup.children[0].children[1].rotation.x += 0.03;   //EAR RIGHT
            this.snakeGroup.children[0].children[2].rotation.x += -0.03;  //EAR LEFT
            this.snakeGroup.children[0].children[5].rotation.y += 0.04;   //SQUAME 1
            this.snakeGroup.children[0].children[6].rotation.y += -0.04;  //SQUAME 2
            this.snakeGroup.children[0].children[7].rotation.y += 0.04;   //SQUAME 3
            this.snakeGroup.children[0].children[10].children[0].position.x += -0.005;  //PUPILS RIGHT
            this.snakeGroup.children[0].children[11].children[0].position.x += -0.005;  //PUPILS LEFT
            this.snakeGroup.children[0].children[8].children[11].position.y += -0.01;   //TONGUE
            this.snakeGroup.children[0].children[8].children[11].position.z += 0.04;   //TONGUE
            this.snakeGroup.children[0].children[8].children[11].rotation.x += -0.02;   //TONGUE

            if (this.snakeGroup.children[0].children[8].rotation.x < -0.4) {
                this.snakeGroup.children[0].children[8].rotation.x = -0.4;
                updown = false;
            };
        }
        else {
            this.snakeGroup.children[0].children[8].rotation.x += 0.02;
            this.snakeGroup.children[0].children[9].rotation.x += -0.02;
            this.snakeGroup.children[0].children[1].rotation.x += -0.03;
            this.snakeGroup.children[0].children[2].rotation.x += 0.03;
            this.snakeGroup.children[0].children[5].rotation.y += -0.04;
            this.snakeGroup.children[0].children[6].rotation.y += 0.04;
            this.snakeGroup.children[0].children[7].rotation.y += -0.04;
            this.snakeGroup.children[0].children[10].children[0].position.x += 0.005;
            this.snakeGroup.children[0].children[11].children[0].position.x += 0.005;
            this.snakeGroup.children[0].children[8].children[11].position.y += 0.01;
            this.snakeGroup.children[0].children[8].children[11].position.z += -0.04;
            this.snakeGroup.children[0].children[8].children[11].rotation.x += 0.02;

            if (this.snakeGroup.children[0].children[8].rotation.x > 0.04) {
                this.snakeGroup.children[0].children[8].rotation.x = 0.04;
                updown = true;
            };
        }

        /*         this.snakeGroup.children[0].children[1].position.x = 3;
                this.snakeGroup.children[0].children[2].position.x = 3; */


    }

    updateBody(x, y, z) {
        /*
            Questo metodo riceve in input le informazione relative alle direzione del serpente
            potrebbero essere utili per sistema la spostamento del corpo           
        */

        if (this.snakeGroup.children.length > 1) {

            this.snakeGroup.children[1].visible = false; // BUG GRAFICO

            this.snakeGroup.children[1].position.x = this.snakeGroup.children[0].position.x;
            this.snakeGroup.children[1].position.y = this.snakeGroup.children[0].position.y;
            this.snakeGroup.children[1].position.z = this.snakeGroup.children[0].position.z;

            for (var i = this.snakeGroup.children.length - 1; i > 1; i--) {

                this.snakeGroup.children[i].position.x = this.snakeGroup.children[i - 1].position.x - x * 1.1 + Math.cos(delta / 5 + i) / 8; //offset per garantire che ogni cubo si veda
                this.snakeGroup.children[i].position.y = this.snakeGroup.children[i - 1].position.y - y * 1.1 + Math.cos(delta / 5 + i) / 8;
                this.snakeGroup.children[i].position.z = this.snakeGroup.children[i - 1].position.z - z * 1.1 + Math.cos(delta / 5 + i) / 8;

            }
        }
    }

    isEqual(current, next) {

        /*
            metodo che confronta due oggetti Three.Vector
        */

        if (Number(current.x) == next[0])
            if (Number(current.y) == next[1])
                if (Number(current.z) == next[2])
                    return true;
        return false;
    }

    getPosition() {

        /*
            ritorna la posizione della testa dello snake
        */

        return this.snakeGroup.children[0].position;
    }

    outOfBound() {

        if (Math.abs(this.snakeGroup.children[0].position.x) > 35)
            this.isDead = true;
        if (this.snakeGroup.children[0].position.y > 20 || this.snakeGroup.children[0].position.y < -3)
            this.isDead = true;
        if (Math.abs(this.snakeGroup.children[0].position.z) > 45)
            this.isDead = true;

    }

    move() {

        if (!this.isDead) {

            switch (globalKeyPressed) {

                /*
                    Ho introdotto per pulizia il metodo move head che non fa altro che mandare il comando alla testa
                    Viene anche aggiornata la direzione verso cui sta andando il serpente, è utile per scopi futuri
                    UpdateBody è un metodo che racchiude il precedente aggiornamento di tutti i nodi dall' ultimo verso il
                    primo come era prima. Grazie a questa costruzione l' effetto fisarmonica e' stato rimosso.
                */

                // [ Z ]
                case (90):

                    if (this.isEqual(this.snakeDirection, [0, -1, 0])) {
                        console.log("Auto eat");
                        if (this.length == 0) this.isDead = true;
                        break;
                    }

                    this.moveHead(0, +move, 0);
                    this.setOrientation(0, +1, 0);
                    this.updateBody(0, +1, 0);
                    break;

                // [ X ]
                case (88):

                    if (this.isEqual(this.snakeDirection, [0, 1, 0])) {
                        console.log("Auto eat");
                        if (this.length == 0) this.isDead = true;

                        break;
                    }

                    this.moveHead(0, -move, 0);
                    this.setOrientation(0, -1, 0);
                    this.updateBody(0, -1, 0);
                    break;


                // [ W ]
                case (87):
                    if (this.isEqual(this.snakeDirection, [0, 0, -1])) {
                        console.log("Auto eat");
                        if (this.length == 0) this.isDead = true;

                        break;
                    }
                    this.moveHead(0, 0, +move);
                    this.setOrientation(0, 0, 1);
                    this.updateBody(0, 0, 1);
                    break;

                // [ S ] 
                case (83):
                    if (this.isEqual(this.snakeDirection, [0, 0, 1])) {
                        console.log("Auto eat");
                        if (this.length == 0) this.isDead = true;

                        break;
                    }
                    this.moveHead(0, 0, -move);
                    this.setOrientation(0, 0, -1);
                    this.updateBody(0, 0, -1);
                    break;

                // [ A ]
                case (65):
                    if (this.isEqual(this.snakeDirection, [-1, 0, 0])) {
                        console.log("Auto eat");
                        if (this.length == 0) this.isDead = true;

                        break;
                    }
                    this.moveHead(+move, 0, 0);
                    this.setOrientation(+1, 0, 0);
                    this.updateBody(+1, 0, 0);
                    break;

                // [ D ]
                case (68):
                    if (this.isEqual(this.snakeDirection, [1, 0, 0])) {
                        console.log("Auto eat");
                        if (this.length == 0) this.isDead = true;
                        break;
                    }
                    this.moveHead(-move, 0, 0);
                    this.setOrientation(-1, 0, 0);
                    this.updateBody(-1, 0, 0);
                    break;

                /* 
                // shift = add 1
                case (16):
                    this.addBlockEgg();
                    break;

                // MAIUSC = add 2
                case (20):
                    this.addBlockEgg();
                    this.addBlockEgg();
                    break;

                // spacebar = remove 1
                case (32):
                    this.redRemoveBlock();
                    break;
                */

                default: console.log("")

            }
        }
    }

    eatEgg() {

        egg.addEgg();
        this.addBlockEgg();
        this.score += 10;

    }
    eatDuck() {

        duck.addDuck();
        this.addBlockEgg();
        this.score += 20;
    }
    eatSheep() {

        sheep.addSheep();
        this.addBlockEgg();
        this.score = 20 * this.length;

    }

    // MATTEO collision box check
    checkCollision() {
        var BB = new THREE.Box3().setFromObject(this.snakeGroup.children[0]);
        BB.name = "snakeBB";
        //var helper = new THREE.Box3Helper( BB, 0xffff00 );
        //game.scene.add( helper );
        var CC = new THREE.Box3().setFromObject(this.snakeGroup);
        CC.name = "tail"


        var listCollisions = [];
        for (var i = 0; i < game.boxes.length; i++) {
            var collision = BB.intersectsBox(game.boxes[i]);
            if (collision == true) {
                listCollisions.push(game.boxes[i].name);
                if (game.boxes[i].name == "eggBB")
                    this.eatEgg();

                if (game.boxes[i].name == "duckBB")
                    this.eatDuck();

                if (game.boxes[i].name == "sheepBB")
                    this.eatSheep();
                if (game.boxes[i].name == "cloudBB")
                    this.length -= 2;

            }


        }

        // console.log(collision + " " + game.boxes);
        // console.log(listCollisions);
        game.boxes = []; // Cleaning hit boxes buffer

    }

    update() {

        this.move();
        this.outOfBound();
        // MATTEO collision box check
        this.checkCollision();
        move = this.score/550 + 0.15;
    }

    //checkposition

};
function chooseTexture() {
    if (selectWorld == 0) {
        // land 
        skinFile = 'textures/land/skin.jpg';
        headFile = 'textures/land/head.jpg';
    }
    if (selectWorld == 1) {
        // mars 
        skinFile = "textures/mars/skin.jpg";
        headFile = "textures/mars/head.jpg";
    }
    if (selectWorld == 2) {
        // dark 
        skinFile = "textures/dark/skin.jpg";
        headFile = "textures/dark/head.jpg";
    }
}
