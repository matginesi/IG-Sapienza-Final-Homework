class Model
{
    constructor()
    {
        // Group
        // To store all meshes
        this.group = new THREE.Group();

        // Group position value
        this.group.position.set(0, 0, 0);

        // General proprieties of the model
        this.drawable = true;   // If true, it will be draw on screen
        this.solid = true;      // If true, any model can pass trough it
        this.healt = 0xFF;      // Healt of the pg
        this.speed = 0.1;       // Speed of the model
        this.jumpSize = 1;      // Number of blocks that can be jumped
        this.time = 0; // Read value from general timer
        // It is useful for animation timing
        
        // materials and relative creation
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

        // Group vertical angle
        this.vAngle = 0;
        // Group horizontal angle
        this.hAngle = 0;

        // List of function to draw every single pice of the model
        this.drawBody();
        this.drawHead();
        this.drawLegs();
        this.drawTail();
        //...others...
    }

    // Method to update data values
    update()
    {}
    
    // Jump on place animation
    jump()
    {}
    
    // Jump to a place animation
    jumpTo(position)
    {}

    // Attack animation
    attack()
    {}

    // Die animation
    die()
    {}

    // Movement animation
    moveTo(position)
    {}

    // doSomethingTo animation (general) to specific place
    doSomethingTo(position)
    {}

    // doSomething animation (general) on place
    doSomething()
    {}
    
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

}
