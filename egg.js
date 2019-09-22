// array per la geometria dell' uovo
var eggGeometry = [];
for (var deg = 0; deg <= 180; deg += 6) {
    var rad = Math.PI * deg / 180;
    var point = new THREE.Vector2((0.72 + .08 * Math.cos(rad)) * Math.sin(rad), - Math.cos(rad)); // the "egg equation"
    eggGeometry.push(point);
}

class Egg {

    constructor(position) {

        this.position = position;
        this.rotation = new THREE.Vector3(0, 0, 0);

        this.group = new THREE.Group();
        this.group.name = "EggGroup";

        this.blockGeometry = new THREE.LatheBufferGeometry(eggGeometry, 50);
        this.blockMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFAA55,
            wireframe: false,
            depthTest: true,
        });

        this.hitBoxGeometry = new THREE.SphereGeometry(1.5, 10, 10);
        this.hitBoxMaterial = new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            wireframe: true,
            depthTest: true,
            transparent: false,
            opacity: 0.1,
            visible: false
        });


        this.redMaterial = new THREE.MeshPhongMaterial({
            color: 0xCF1919, 
            wireframe: false,
            depthTest: true,
        }); 
        
        this.redMaterialCircle = new THREE.MeshPhongMaterial({
            color: 0xCF1919, 
            wireframe: false,
            depthTest: true,
            opacity : 0.70,
            transparent : true,
        }); 

        // MATTEO rayCaster non serve più
        //this.rayCaster = new THREE.Raycaster();
        this.blocks = 0;
    }

    build() {

        // Matteo la hitbox non serve più
        /*
        var hitBoxMesh = new THREE.Mesh(this.hitBoxGeometry, this.hitBoxMaterial);
        hitBoxMesh.castShadow = true;
        hitBoxMesh.receiveShadow = true;
        hitBoxMesh.name = "Egg:HitBox";
        this.group.add(hitBoxMesh);
        */

        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.name = "Egg:Block_0";

        this.group.add(blockMesh);



        const Circularegg = new THREE.TorusBufferGeometry( 2.5, 0.15, 180, 50 );
        const circoegg = new THREE.Mesh(Circularegg, this.redMaterialCircle);
        circoegg.castShadow = true;
        circoegg.receiveShadow = true;
        circoegg.position.y = -0.15;

        this.group.add(circoegg);  

        this.group.position.x = this.position.x;
        this.group.position.y = this.position.y;
        this.group.position.z = this.position.z;

        game.scene.add(this.group);

        this.blocks ++; // adding first egg

    }

    addEgg() {

        game.scene.remove(this.group);
        egg = new Egg(new THREE.Vector3(randomPosition(25,-25), randomPosition(7,1), randomPosition(25,-25)));
        egg.build();

    }

    getPosition(){

        return this.egg.position;
    }

    update() {
        var t = game.timer.getElapsedTime();

        // this.group.rotation.y = t * 16 / (2 * Math.PI);
        // this.group.rotation.z = t * 10 / (2 * Math.PI);
        // this.group.rotation.x = t * 35 / (2 * Math.PI);

        this.group.position.y += Math.sin(3 * t) / 100;

        // rotazione cerchio
        this.group.children[1].rotation.y += 0.02;
        this.group.children[1].rotation.z += 0.02;
        this.group.children[1].rotation.x += 0.02;


        // MATTEO collision box
        var BB = new THREE.Box3().setFromObject(this.group);
        BB.name = "eggBB";    
        game.boxes.push(BB);
    }
}
