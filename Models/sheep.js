


var sheepGeometry = [];
for (var deg = 0; deg <= 180; deg += 6) {
    var rad = Math.PI * deg / 180;
    var point = new THREE.Vector2((0.92 + .08 * Math.cos(rad)) * Math.sin(rad), - Math.cos(rad)); // the "egg equation"
    sheepGeometry.push(point);
}




class Sheep {

    constructor(position) {

        this.position = position;
        this.rotation = new THREE.Vector3(0, 0, 0);

        this.group = new THREE.Group();
        this.group.name = "SheepGroup";

        // this.blockGeometry = new THREE.LatheBufferGeometry(sheepGeometry, 50);        
        this.blockGeometry = new THREE.OctahedronBufferGeometry(1.1, 1);
        this.blockMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            // roughness: 1,
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


        this.woolMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 1,
            // FlatShading : true,
        });
        this.skinMaterial = new THREE.MeshStandardMaterial({
            color: 0xffaf8b,
            roughness: 1,
            // FlatShading : true,
        });
        this.darkMaterial = new THREE.MeshStandardMaterial({
            color: 0x4b4553,
            roughness: 1,
            // FlatShading : true,
        });

        this.whiteMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            wireframe: false,
            depthTest: true,
        });

        this.whiteMaterialCircle = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            wireframe: false,
            depthTest: true,
            opacity : 0.80,
            transparent : true,
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

        // MATTEO rayCaster non serve più
        //this.rayCaster = new THREE.Raycaster();

        // initially sheep is oriented vs positive Z axis
        this.sheepDirection = new THREE.Vector3(0, 0, 1);
    }

    build() {

        // MATTEO la hitbox non serve più
        /*
        var hitBoxMesh = new THREE.Mesh(this.hitBoxGeometry, this.hitBoxMaterial);
        hitBoxMesh.castShadow = true;
        hitBoxMesh.receiveShadow = true;
        hitBoxMesh.name = "Sheep:HitBox";
        this.group.add(hitBoxMesh);
        */

        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.rotation.set(1.57, 0, 0);
        blockMesh.position.set(0, 0, 0);
        blockMesh.name = "Sheep:Block_0";

        this.group.add(blockMesh);

        const Circularsheep = new THREE.TorusBufferGeometry(2.5, 0.15, 180, 50);
        const circosheep = new THREE.Mesh(Circularsheep, this.whiteMaterialCircle);
        circosheep.castShadow = true;
        circosheep.receiveShadow = true;
        circosheep.position.y = -0.15;

        this.group.add(circosheep);

        /*         const textgeometrysheep = new THREE.TextBufferGeometry( 'Hello three.js!', {
                      size: 100,
                      height: 50,
                      curveSegments: 12,
                      bevelEnabled: true,
                      bevelThickness: 10,
                      bevelSize: 8,
                      bevelOffset: 0,
                      bevelSegments: 5
                    } );   */

        // blockMesh.add(textgeometrysheep);

        /* 
                const bodyGeometry = new THREE.IcosahedronGeometry(1.7, 0);
                const body = new THREE.Mesh(bodyGeometry, this.woolMaterial);
                body.castShadow = true;
                body.receiveShadow = true;
                this.group.add(body);
             */


        // HEAD (children[0].childer[1 e 2])
        const head = new THREE.Group();
        head.position.set(0, 0.65, 1.2);
        head.rotation.set(-0.4, 0, 0);
        this.group.add(head);



        // la coda della pecora

        const tailGeometry = new THREE.OctahedronBufferGeometry(0.3, 1);
        const tail = new THREE.Mesh(tailGeometry, this.blockMaterial);
        tail.position.set(0, 0.1, -1);
        this.group.add(tail);



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
        face.rotation.y = 0.78;
        head.add(face);

        const woolGeometry = new THREE.OctahedronBufferGeometry(0.2, 1);
        const wool = new THREE.Mesh(woolGeometry, this.blockMaterial);
        wool.position.set(0, 0.3, 0.07);
        wool.rotation.x = 0.35;
        head.add(wool);


        const woolGeometry01 = wool.clone();
        woolGeometry01.position.set(-0.3, 0.25, 0);
        head.add(woolGeometry01);


        const woolGeometry02 = wool.clone();
        woolGeometry02.position.set(0.3, 0.25, -0.3);
        head.add(woolGeometry02);


        const woolGeometry03 = wool.clone();
        woolGeometry03.position.set(-0.3, 0.25, -0.3);
        head.add(woolGeometry03);


        const woolGeometry04 = wool.clone();
        woolGeometry04.position.set(0, 0.25, 0.3);
        head.add(woolGeometry04);




        const woolGeometry05 = wool.clone();
        woolGeometry05.position.set(0, 0.25, 0);
        head.add(woolGeometry05);


        const woolGeometry06 = wool.clone();
        woolGeometry06.position.set(0, 0.25, -0.3);
        head.add(woolGeometry06);





        const woolGeometry08 = wool.clone();
        woolGeometry08.position.set(0.3, 0.25, 0);
        head.add(woolGeometry08);


        /* 
                const woolGeometry10 = new THREE.OctahedronBufferGeometry(0.2, 1);
                const wool10 = new THREE.Mesh(woolGeometry10, this.blockMaterial);
                wool10.position.set(0, -1, 0);
                head.add(wool10); */



        const sheephornGeometry = new THREE.ConeBufferGeometry(0.12, 0.55, 8);
        const sheephorn = new THREE.Mesh(sheephornGeometry, this.blackMaterial);
        sheephorn.position.set(0.22, 0.4, 0.22);
        head.add(sheephorn);


        const sheephornGeometry2 = new THREE.ConeBufferGeometry(0.12, 0.55, 8);
        const sheephorn2 = new THREE.Mesh(sheephornGeometry2, this.blackMaterial);
        sheephorn2.position.set(-0.22, 0.4, 0.22);
        head.add(sheephorn2);



        const rightEyeGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.06, 6);
        const rightEye = new THREE.Mesh(rightEyeGeometry, this.darkMaterial);
        rightEye.castShadow = true;
        rightEye.receiveShadow = true;
        rightEye.position.set(0.35, -0.48, 0.33);
        rightEye.rotation.set(2.285, 0, -0.785);
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
        this.rightEar.rotation.set(0.35, 0, 0.872);
        head.add(this.rightEar);

        this.leftEar = this.rightEar.clone();
        this.leftEar.position.x = -this.rightEar.position.x;
        this.leftEar.rotation.z = -this.rightEar.rotation.z;
        head.add(this.leftEar);


        const legGeometry = new THREE.CylinderGeometry(0.3, 0.15, 1, 4);
        legGeometry.translate(0, -0.5, 0);
        this.frontRightLeg = new THREE.Mesh(legGeometry, this.darkMaterial);
        this.frontRightLeg.castShadow = true;
        this.frontRightLeg.receiveShadow = true;
        this.frontRightLeg.position.set(0.7, -0.2, 0.5);
        this.frontRightLeg.rotation.x = 0;
        this.group.add(this.frontRightLeg);

        this.frontLeftLeg = this.frontRightLeg.clone();
        this.frontLeftLeg.position.x = -this.frontRightLeg.position.x;
        this.frontLeftLeg.rotation.z = -this.frontRightLeg.rotation.z;
        this.frontLeftLeg.rotation.x = 0;
        this.group.add(this.frontLeftLeg);

        this.backRightLeg = this.frontRightLeg.clone();
        this.backRightLeg.position.z = -this.frontRightLeg.position.z;
        this.backRightLeg.rotation.x = -this.frontRightLeg.rotation.x;
        this.backRightLeg.rotation.x = 0;
        this.group.add(this.backRightLeg);

        this.backLeftLeg = this.frontLeftLeg.clone();
        this.backLeftLeg.position.z = -this.frontLeftLeg.position.z;
        this.backLeftLeg.rotation.x = -this.frontLeftLeg.rotation.x;
        this.group.add(this.backLeftLeg);





        this.group.position.x = this.position.x;
        this.group.position.y = this.position.y;
        this.group.position.z = this.position.z;

        game.scene.add(this.group);

        this.blocks = 1; // adding first sheep

    }


    movesheep(x, y, z) {
        /*
            Impartisce i comandi alla testa
            Aggiunto per pulizia e per usi futuri (if WallHit then goRight)  
        */


        this.sheepGroup.children[0].position.x += x;
        this.sheepGroup.children[0].position.y += y;
        this.sheepGroup.children[0].position.z += z;

        /*         this.sheepGroup.children[0].children[1].position.x = 3;
                this.sheepGroup.children[0].children[2].position.x = 3; */


    }

    addSheep() {
        game.scene.remove(sheep.group);
        sheep = new Sheep(new THREE.Vector3(randomPosition(25,-25), randomPosition(7,1), randomPosition(25,-25)));
        sheep.build();

    }

    update() {
        var t = game.timer.getElapsedTime();

        // this.group.rotation.y = t * 16 / (2 * Math.PI);
        // this.group.rotation.z = t * 10 / (2 * Math.PI);
        // this.group.rotation.x = t * 35 / (2 * Math.PI);
        /* var causalmove = 0;
        var duckdirection = 'x';
        var duckrotation = 'x'; */

        this.group.position.z += 0.1;
        if (Math.abs(this.group.position.z) >= 25) this.group.position.z = 0.5;
        if (Math.abs(this.group.position.x) >= 20) this.group.position.x = 0.5;

        this.group.children[1].rotation.z += Math.sin(3 * t) / 90;
        this.group.children[2].rotation.y += Math.sin(3 * t) / 45;
        this.group.children[3].position.x += Math.sin(3 * t) / 200;

        this.group.children[1].rotation.x += 0.02;
        this.group.children[1].rotation.y += 0.02;
        this.group.children[1].rotation.z += 0.02;



        this.group.children[4].rotation.x += Math.sin(3 * t) / 35;
        this.group.children[5].rotation.x += -Math.sin(3 * t) / 35;
        this.group.children[6].rotation.x += Math.sin(3 * t) / 35;
        this.group.children[7].rotation.x += -Math.sin(3 * t) / 35;

        var BB = new THREE.Box3().setFromObject(this.group.children[0]);
        BB.name = "sheepBB";
        game.boxes.push(BB);

    }
}
