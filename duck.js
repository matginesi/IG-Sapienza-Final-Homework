var causalmove = 0;
var duckdirection = 'z';
var duckverse = -1;
var duckrotation = 'x';
var duckloadertext = new THREE.FontLoader();

var duckBodyGeometry = [];
for (var deg = 0; deg <= 180; deg += 6) {
    var rad = Math.PI * deg / 180;
    var point = new THREE.Vector2((0.72 + .08 * Math.cos(rad)) * Math.sin(rad), - Math.cos(rad));
    duckBodyGeometry.push(point);
}

class Duck {

    constructor(position) {

        this.position = position;
        // this.rotation = new THREE.Vector3(0, 0, 0);

        this.group = new THREE.Group();
        this.group.name = "DuckGroup";

        this.blockGeometry = new THREE.LatheBufferGeometry(duckBodyGeometry, 50);
        this.blockMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFD700,
            wireframe: false,
            depthTest: true,
        });

        this.hitBoxGeometry = new THREE.SphereGeometry(1.5, 10, 10);
        this.hitBoxMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFD700,
            wireframe: true,
            depthTest: true,
            transparent: false,
            opacity: 0.1,
            visible: false
        });

        this.skinMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFD700,
            wireframe: false,
            depthTest: true,
        });

        this.whiteMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            wireframe: false,
            depthTest: true,
        });

        this.blackMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000,
            wireframe: false,
            depthTest: true,
        });

        this.orangeMaterial = new THREE.MeshPhongMaterial({
            color: 0xFF8C00,
            wireframe: false,
            depthTest: true,
        });

        this.orangeMaterialCircle = new THREE.MeshPhongMaterial({
            color: 0xFF8C00,
            wireframe: false,
            depthTest: true,
            opacity : 0.60,
            transparent : true,
        });
        

        // MATTEO il raycaster non serve più
        // this.rayCaster = new THREE.Raycaster();

        // initially duck is oriented vs positive Z axis
        this.duckDirection = new THREE.Vector3(0, 0, 1);
    }

    build() {

        // MATTEO la hitbox non serve più
        /*
        var hitBoxMesh = new THREE.Mesh(this.hitBoxGeometry, this.hitBoxMaterial);
        hitBoxMesh.castShadow = false;
        hitBoxMesh.receiveShadow = false;
        hitBoxMesh.name = "Duck:HitBox";
        this.group.add(hitBoxMesh);
        */

        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.rotation.set(1.57, 0, 0);
        blockMesh.name = "Duck:Block_0";

        this.group.add(blockMesh);

        // WINGS (children[0].childer[1 e 2])

        const wingsGeometryRIGHT = new THREE.BoxGeometry(0.1, 1.1, 0.4);
        const wingsRIGHT = new THREE.Mesh(wingsGeometryRIGHT, this.skinMaterial);
        wingsRIGHT.castShadow = true;
        wingsRIGHT.receiveShadow = true;
        wingsRIGHT.position.set(0.6, 0, -0.2);
        wingsRIGHT.rotation.set(0.5, 0, -0.8);
        blockMesh.add(wingsRIGHT);

        const wingsGeometryLEFT = new THREE.BoxGeometry(0.1, 1.1, 0.4);
        const wingsLEFT = new THREE.Mesh(wingsGeometryLEFT, this.skinMaterial);
        wingsLEFT.castShadow = true;
        wingsLEFT.receiveShadow = true;
        wingsLEFT.position.set(-0.6, 0, -0.2);
        wingsLEFT.rotation.set(0.5, 0, 0.8);
        blockMesh.add(wingsLEFT);

        // FOOT (children[0].childer[1 e 2])
        const footsGeometryRIGHT = new THREE.BoxGeometry(0.4, 0.7, 0.1);
        const footsRIGHT = new THREE.Mesh(footsGeometryRIGHT, this.skinMaterial);
        footsRIGHT.castShadow = true;
        footsRIGHT.receiveShadow = true;
        footsRIGHT.position.set(0.4, -0.5, 0.55);
        footsRIGHT.rotation.set(0, 0, 0.3);
        blockMesh.add(footsRIGHT);

        const footsGeometryLEFT = new THREE.BoxGeometry(0.4, 0.7, 0.1);
        const footsLEFT = new THREE.Mesh(footsGeometryLEFT, this.skinMaterial);
        footsLEFT.castShadow = true;
        footsLEFT.receiveShadow = true;
        footsLEFT.position.set(-0.4, -0.5, 0.55);
        footsLEFT.rotation.set(0, 0, -0.3);
        blockMesh.add(footsLEFT);

        const footseparatorGeometryRIGHT = new THREE.CylinderGeometry(0.03, 0.03, 0.15, 8);
        const footseparatorfaceRIGHT = new THREE.Mesh(footseparatorGeometryRIGHT, this.orangeMaterial);
        footseparatorfaceRIGHT.castShadow = true;
        footseparatorfaceRIGHT.receiveShadow = true;
        footseparatorfaceRIGHT.position.set(0.08, -0.2, -0.03);
        footseparatorfaceRIGHT.rotation.set(0, 0, 0);
        footsRIGHT.add(footseparatorfaceRIGHT);

        const footseparatorGeometryLEFT = new THREE.CylinderGeometry(0.03, 0.03, 0.15, 8);
        const footseparatorfaceLEFT = new THREE.Mesh(footseparatorGeometryLEFT, this.orangeMaterial);
        footseparatorfaceLEFT.castShadow = true;
        footseparatorfaceLEFT.receiveShadow = true;
        footseparatorfaceLEFT.position.set(-0.08, -0.2, -0.03);
        footseparatorfaceLEFT.rotation.set(0, 0, 0);
        footsRIGHT.add(footseparatorfaceLEFT);

        const footseparatorGeometryRIGHT2 = new THREE.CylinderGeometry(0.03, 0.03, 0.15, 8);
        const footseparatorfaceRIGHT2 = new THREE.Mesh(footseparatorGeometryRIGHT2, this.orangeMaterial);
        footseparatorfaceRIGHT2.castShadow = true;
        footseparatorfaceRIGHT2.receiveShadow = true;
        footseparatorfaceRIGHT2.position.set(0.08, -0.2, -0.03);
        footseparatorfaceRIGHT2.rotation.set(0, 0, 0);
        footsLEFT.add(footseparatorfaceRIGHT2);

        const footseparatorGeometryLEFT2 = new THREE.CylinderGeometry(0.03, 0.03, 0.15, 8);
        const footseparatorfaceLEFT2 = new THREE.Mesh(footseparatorGeometryLEFT2, this.orangeMaterial);
        footseparatorfaceLEFT2.castShadow = true;
        footseparatorfaceLEFT2.receiveShadow = true;
        footseparatorfaceLEFT2.position.set(-0.08, -0.2, -0.03);
        footseparatorfaceLEFT2.rotation.set(0, 0, 0);
        footsLEFT.add(footseparatorfaceLEFT2);

        // HEAD (children[0].childer[1 e 2])
        const head = new THREE.Group();
        head.position.set(0, 1.5, -0.7);
        head.rotation.set(0, Math.PI, 0);
        this.group.add(head);

        const faceGeometryUP = new THREE.SphereGeometry(0.59, 0.2, 0.5);
        const faceUP = new THREE.Mesh(faceGeometryUP, this.skinMaterial);
        faceUP.castShadow = true;
        faceUP.receiveShadow = true;
        faceUP.position.z = -0.2;
        faceUP.position.y = -0.5;
        head.add(faceUP);

        const faceGeometryDOWN = new THREE.BoxGeometry(0.5, 0.05, 0.4);
        const faceDOWN = new THREE.Mesh(faceGeometryDOWN, this.orangeMaterial);
        faceDOWN.castShadow = true;
        faceDOWN.receiveShadow = true;
        faceDOWN.position.set(0, -0.7, 0.35);
        // faceDOWN.rotation.set(0.1, 0, 0);        
        faceDOWN.rotation.set(0.5, 0, 0);
        head.add(faceDOWN);

        const faceGeometryDOWN2 = new THREE.BoxGeometry(0.5, 0.05, 0.4);
        const faceDOWN2 = new THREE.Mesh(faceGeometryDOWN2, this.orangeMaterial);
        faceDOWN2.castShadow = true;
        faceDOWN2.receiveShadow = true;
        faceDOWN2.position.set(0, -0.8, 0.3);
        // faceDOWN.rotation.set(0.1, 0, 0);        
        faceDOWN2.rotation.set(0.5, 0, 0);
        head.add(faceDOWN2);

        const eyeGeometryRIGHT = new THREE.SphereGeometry(0.15, 0.2, 0.2);
        const eyeRIGHT = new THREE.Mesh(eyeGeometryRIGHT, this.whiteMaterial);
        eyeRIGHT.castShadow = true;
        eyeRIGHT.receiveShadow = true;
        eyeRIGHT.position.set(0.2, -0.35, 0.25);
        eyeRIGHT.rotation.set(1.65, 0, 0);
        head.add(eyeRIGHT);

        const eyeGeometryLEFT = new THREE.SphereGeometry(0.15, 0.2, 0.2);
        const eyeLEFT = new THREE.Mesh(eyeGeometryLEFT, this.whiteMaterial);
        eyeLEFT.castShadow = true;
        eyeLEFT.receiveShadow = true;
        eyeLEFT.position.set(-0.2, -0.35, 0.25);
        eyeLEFT.rotation.set(1.65, 0, 0);
        head.add(eyeLEFT);

        const pupilGeometryRIGHT = new THREE.SphereGeometry(0.05, 0.05, 0.05);
        const pupilRIGHT = new THREE.Mesh(pupilGeometryRIGHT, this.blackMaterial);
        pupilRIGHT.castShadow = true;
        pupilRIGHT.receiveShadow = true;
        pupilRIGHT.position.set(0, 0.12, -0.02);
        eyeRIGHT.add(pupilRIGHT);

        const pupilGeometryLEFT = new THREE.SphereGeometry(0.05, 0.05, 0.05);
        const pupilLEFT = new THREE.Mesh(pupilGeometryLEFT, this.blackMaterial);
        pupilLEFT.castShadow = true;
        pupilLEFT.receiveShadow = true;
        pupilLEFT.position.set(0, 0.12, -0.02);
        eyeLEFT.add(pupilLEFT);

        const noseGeometryRIGHT = new THREE.CylinderGeometry(0.015, 0.07, 0.2, 8);
        const nosefaceRIGHT = new THREE.Mesh(noseGeometryRIGHT, this.blackMaterial);
        nosefaceRIGHT.castShadow = true;
        nosefaceRIGHT.receiveShadow = true;
        nosefaceRIGHT.position.set(0.05, -0.6, 0.25);
        nosefaceRIGHT.rotation.set(1.65, 0, 0);
        head.add(nosefaceRIGHT);

        const noseGeometryLEFT = new THREE.CylinderGeometry(0.015, 0.07, 0.2, 8);
        const nosefaceLEFT = new THREE.Mesh(noseGeometryLEFT, this.blackMaterial);
        nosefaceLEFT.castShadow = true;
        nosefaceLEFT.receiveShadow = true;
        nosefaceLEFT.position.set(-0.05, -0.6, 0.25);
        nosefaceLEFT.rotation.set(1.65, 0, 0);
        head.add(nosefaceLEFT);

        var Circularduck = new THREE.TorusBufferGeometry(2.5, 0.15, 180, 50);
        var circoduck = new THREE.Mesh(Circularduck, this.orangeMaterialCircle);
        circoduck.castShadow = true;
        circoduck.receiveShadow = true;
        circoduck.position.y = -0.15;
        circoduck.name = "circle";


        this.group.add(circoduck);

        this.group.position.x = this.position.x;
        this.group.position.y = this.position.y;
        this.group.position.z = this.position.z;

        game.scene.add(this.group);

        this.blocks = 1; // adding first duck

    }

    moveduck(x, y, z) {
        /*
            Impartisce i comandi 
        */

        this.group.children[0].position.x += x;
        this.group.children[0].position.y += y;
        this.group.children[0].position.z += z;

    }

    getPosition() {

        return this.group.position;
    }

    addDuck() {

        // NEW : 
        game.scene.remove(this.group);
        duck = new Duck(new THREE.Vector3(randomPosition(25,-25), randomPosition(7,1), randomPosition(25,-25)));
        duck.build();

    }

    update() {

        var t = game.timer.getElapsedTime();

        this.group.children[0].children[1].rotation.z += Math.sin(3 * t) / 30;
        this.group.children[0].children[0].rotation.z += Math.sin(3 * t) / 30;
        this.group.children[1].children[1].rotation.x += Math.sin(3 * t) / 30;
        this.group.children[1].children[2].rotation.x += -Math.sin(3 * t) / 30;
        this.group.children[0].rotation.x += Math.sin(3 * t) / 90;
        this.group.children[1].rotation.y += Math.sin(3 * t) / 45;

        this.group.children[2].rotation.y += 0.02;
        this.group.children[2].rotation.x += 0.02;
        this.group.children[2].rotation.z += 0.02;

        causalmove += 1;

        if (causalmove < 100) {
            this.group.position.z += 0.05;
            this.group.rotation.y = 3.14;
            this.group.rotation.z = 0;

        }
        else if (causalmove < 200) {
            this.group.position.x += 0.05;
            this.group.rotation.y = 4.6;
            this.group.rotation.z = 0;


        }
        else if (causalmove < 300) {
            this.group.position.z += -0.05;
            this.group.rotation.y = 0;
            this.group.rotation.z = 0;

        }
        else {
            this.group.position.x += -0.05;
            this.group.rotation.y = 1.5;
            this.group.rotation.z = 0;

            if (causalmove == 400) {
                causalmove = 0;
            }
        }

        // MATTEO collision box
        var BB = new THREE.Box3().setFromObject(this.group);
        BB.name = "duckBB";
        game.boxes.push(BB);
    }
}
