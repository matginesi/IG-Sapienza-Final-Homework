


var treeGeometry = [];
for (var deg = 0; deg <= 180; deg += 6) {
    var rad = Math.PI * deg / 180;
    var point = new THREE.Vector2((0.92 + .08 * Math.cos(rad)) * Math.sin(rad), - Math.cos(rad) ); // the "egg equation"
    treeGeometry.push(point);
}




class Tree {

    constructor(position) {

        this.position = position;
        this.rotation = new THREE.Vector3(0, 0, 0);

        this.group = new THREE.Group();
        this.group.name = "TreeGroup";

        // this.blockGeometry = new THREE.LatheBufferGeometry(treeGeometry, 50);        
        this.blockGeometry = new THREE.OctahedronBufferGeometry(1.1, 1);
        this.blockMaterial = new THREE.MeshPhongMaterial({
            color: 0x279f14,
            roughness: 1,
            shading: THREE.FlatShading,
            wireframe: false,
            depthTest: true,
        });

        // MATTEO la hitbox non serve più
        /*
        this.hitBoxGeometry = new THREE.SphereGeometry(1.5, 10, 10);
        this.hitBoxMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFD700,
            wireframe: true,
            depthTest: true,
            transparent: false,
            opacity: 0.1,
            visible: false
        });
        */

        this.foliageMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 1,
            shading: THREE.FlatShading
          });
          this.skinMaterial = new THREE.MeshStandardMaterial({
            color: 0xffaf8b,
            roughness: 1,
            shading: THREE.FlatShading
          });
          this.darkMaterial = new THREE.MeshStandardMaterial({
            color: 0x4b4553,
            roughness: 1,
            shading: THREE.FlatShading
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

        this.rayCaster = new THREE.Raycaster();

        // initially tree is oriented vs positive Z axis
        this.treeDirection = new THREE.Vector3(0, 0, 1);
    }

    build() {

        // MATTEO la hitbox non serve più
        /*
        var hitBoxMesh = new THREE.Mesh(this.hitBoxGeometry, this.hitBoxMaterial);
        hitBoxMesh.castShadow = true;
        hitBoxMesh.receiveShadow = true;
        hitBoxMesh.name = "Tree:HitBox";
        this.group.add(hitBoxMesh);
        */
       
        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.rotation.set(1.57, 0, 0);
        blockMesh.position.set(3, 3, 3);
        blockMesh.name = "Tree:Block_0";

        this.group.add(blockMesh);
        


        const foliageGeometry = new THREE.OctahedronBufferGeometry(0.2, 1);
        const foliage = new THREE.Mesh(foliageGeometry, this.blockMaterial);
        foliage.position.set(0, 0.3, 0.07);
        foliage.rotation.x = 0.35;
        blockMesh.add(foliage);


        const foliageGeometry01 = foliage.clone();
        foliageGeometry01.position.set(0.3, 0.35, 0.2);
        blockMesh.add(foliageGeometry01);


        const foliageGeometry02 = foliage.clone();
        foliageGeometry02.position.set(-0.3, 0.35, 0);
        blockMesh.add(foliageGeometry02);


        const foliageGeometry03 = foliage.clone();
        foliageGeometry03.position.set(0.3, 0.35, 0);
        blockMesh.add(foliageGeometry03);


        const foliageGeometry04 = foliage.clone();
        foliageGeometry04.position.set(-0.3, 0.35, 0.2);
        blockMesh.add(foliageGeometry04);


        const foliageGeometry05 = foliage.clone();
        foliageGeometry05.position.set(0, 0.35, 0);
        blockMesh.add(foliageGeometry05);


        const foliageGeometry06 = foliage.clone();
        foliageGeometry06.position.set(-0, 0.35, 0.2);
        blockMesh.add(foliageGeometry06);


        this.group.position.x = this.position.x;
        this.group.position.y = this.position.y;
        this.group.position.z = this.position.z;

        game.scene.add(this.group);

        this.blocks = 1; // adding first tree

    }


    movetree(x, y, z) {
        /*
            Impartisce i comandi alla testa
            Aggiunto per pulizia e per usi futuri (if WallHit then goRight)  
        */
        

        this.treeGroup.children[0].position.x += x;
        this.treeGroup.children[0].position.y += y;
        this.treeGroup.children[0].position.z += z;

/*         this.treeGroup.children[0].children[1].position.x = 3;
        this.treeGroup.children[0].children[2].position.x = 3; */


    }

    setOrientation(x, y, z) {

        this.treeDirection = new THREE.Vector3(x, y, z);

        /*
            Questa sezione qui sotto serve a capire come girare la testa
            in base alla direzione del movimento
        */



    if (x != 0) {
        
        if (this.treeGroup.children[0].rotation.x > 0){
            this.treeGroup.children[0].rotation.x += - 0.1;
        }
        else if (this.treeGroup.children[0].rotation.x < 0){
            this.treeGroup.children[0].rotation.x += 0.1;
        }

        if (this.treeGroup.children[0].rotation.z > 0){
            this.treeGroup.children[0].rotation.z += - 0.1;
        }
        else if (this.treeGroup.children[0].rotation.z < 0){
            this.treeGroup.children[0].rotation.z += 0.1;
        }                    
         

        //1 Premo A e sto in posizione 0: arrivo in posizione y = 1.5
         if ((x > 0) && (this.treeGroup.children[0].rotation.y >= 0) && (this.treeGroup.children[0].rotation.y < 1.45)) {
            this.treeGroup.children[0].rotation.y += 0.1;
            if (this.treeGroup.children[0].rotation.y > 1.4) {
                this.treeGroup.children[0].rotation.y = 1.5;
            };
         }
        

        //5 Premo D e sto in posizione 0: arrivo in posizione y = 1.5
         else if ((x < 0) && (this.treeGroup.children[0].rotation.y < 1)) {
            this.treeGroup.children[0].rotation.y = 6;
         }
         else if ((x < 0) && (this.treeGroup.children[0].rotation.y > 4.65) && (this.treeGroup.children[0].rotation.y < 6.05)) {
            this.treeGroup.children[0].rotation.y += -0.1;
            if (this.treeGroup.children[0].rotation.y < 4.65) {
                this.treeGroup.children[0].rotation.y = 4.6;
            };
         }
        //7 Premo A e sto in posizione 3.4 o -3.4: arrivo in posizione y = 1.7
         else if ((x > 0) && (this.treeGroup.children[0].rotation.y > 1.55) && (this.treeGroup.children[0].rotation.y < 3.2)) {
            this.treeGroup.children[0].rotation.y += -0.1;
            if (this.treeGroup.children[0].rotation.y < 1.6) {
                this.treeGroup.children[0].rotation.y = 1.5;
            };
         }
         
        //3 Premo D e sto in posizione 3.1 o -3.1: arrivo in posizione y = 1.5
        else if ((x < 0) && ((this.treeGroup.children[0].rotation.y >= 3.1) && (this.treeGroup.children[0].rotation.y < 4.55))) {
            this.treeGroup.children[0].rotation.y += 0.1;
            if (this.treeGroup.children[0].rotation.y > 4.5) {
                this.treeGroup.children[0].rotation.y = 4.6;
            };
         }


    }

    if (y != 0) {
        this.treeGroup.children[0].rotation.z = 0;
        this.treeGroup.children[0].rotation.x =  -y * Math.PI / 2;
        this.treeGroup.children[0].rotation.y = 0;
    }


    if (z != 0) {


        if (this.treeGroup.children[0].rotation.x > 0){
            this.treeGroup.children[0].rotation.x += -0.1;
        }
        else if (this.treeGroup.children[0].rotation.x < 0){
            this.treeGroup.children[0].rotation.x += 0.1;
        }

        if (this.treeGroup.children[0].rotation.z > 0){
            this.treeGroup.children[0].rotation.z += -0.1;
        }
        else if (this.treeGroup.children[0].rotation.z < 0){
            this.treeGroup.children[0].rotation.z += 0.1;
        }                    

        
        //4 Premo W e sto in posizione 1.5: arrivo in posizione y = 0
        if ((z > 0) && (this.treeGroup.children[0].rotation.y >= 4.55) && (this.treeGroup.children[0].rotation.y < 6.05)) {
            this.treeGroup.children[0].rotation.y += 0.1;
            if (this.treeGroup.children[0].rotation.y > 6) {
                this.treeGroup.children[0].rotation.y = 0;
            };
         }
        //6 Premo S e sto in posizione -1.5: arrivo in posizione y = -3.4
        else if ((z < 0) && (this.treeGroup.children[0].rotation.y <= 4.65) && (this.treeGroup.children[0].rotation.y >= 3.15)) {
            this.treeGroup.children[0].rotation.y += -0.1;
            if (this.treeGroup.children[0].rotation.y < 3.2) {
                this.treeGroup.children[0].rotation.y = 3.1;
            };
         }
         
        //8 Premo W e sto in posizione -1.5: arrivo in posizione y = 0
         else if ((z > 0) && (this.treeGroup.children[0].rotation.y > 0.05) && (this.treeGroup.children[0].rotation.y < 1.75)) {
            this.treeGroup.children[0].rotation.y += -0.1;
            if (this.treeGroup.children[0].rotation.y < 0.1) {
                this.treeGroup.children[0].rotation.y = 0;
            };
         }
         
        //2 Premo S e sto in posizione 1.5: arrivo in posizione y = 3.1
         else if ((z < 0) && (this.treeGroup.children[0].rotation.y >= 1.45) && (this.treeGroup.children[0].rotation.y < 3.05)) {
            this.treeGroup.children[0].rotation.y += 0.1;
            if (this.treeGroup.children[0].rotation.y > 3) {
                this.sheepGroup.children[0].rotation.y = 3.1;
            };
         }
         


    }


    }



    addTree() {

        tree = new Tree(new THREE.Vector3(Math.random(-10) * 10, 2, Math.random(-10) * 10));
        tree.build();

        globalKeyPressed = null;

    }





    update() {
        // MATTEO collision box
        var BB = new THREE.Box3().setFromObject(this.group.children[0]);
        BB.name = "threeBB";    
        game.boxes.push(BB);

    
    }
}
