


class Cactus {

    constructor(position) {

        this.position = position;
        this.rotation = new THREE.Vector3(0, 0, 0);

        this.group = new THREE.Group();
        this.group.name = "CactusGroup";

        // this.blockGeometry = new THREE.CylinderBufferGeometry( 5, 5, 20, 32 );        
        this.blockGeometry = new THREE.CylinderBufferGeometry( 0.5, 0.5, 8, 14 );
        this.blockMaterial = new THREE.MeshPhongMaterial({
            color: 0x45E165,
            roughness: 1,
            shading: THREE.FlatShading,
            wireframe: false,
            depthTest: true,
        });


        this.cactusMaterial = new THREE.MeshStandardMaterial({
            color: 0x45E165,
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

        // initially cactus is oriented vs positive Z axis
        this.cactusDirection = new THREE.Vector3(0, 0, 1);

    }

    build() {

        // MATTEO la hitbox non serve più
        /*
        var hitBoxMesh = new THREE.Mesh(this.hitBoxGeometry, this.hitBoxMaterial);
        hitBoxMesh.castShadow = true;
        hitBoxMesh.receiveShadow = true;
        hitBoxMesh.name = "Cactus:HitBox";
        this.group.add(hitBoxMesh);
        */
       
        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.rotation.set(0, 0, 0);
        blockMesh.position.set(0, 0, 0);
        blockMesh.name = "Cactus:Block_0";

        this.group.add(blockMesh);
        

        //braccio orizzontale
        const cactusGeometry = new THREE.CylinderBufferGeometry( 0.5, 0.5, 4.5, 14 );
        const cactus = new THREE.Mesh(cactusGeometry, this.cactusMaterial);
        cactus.position.set(0,0,0);
        cactus.rotation.set(1.5,4,0);
        blockMesh.add(cactus);

        //braccio verticale grande
        const cactusGeometry01  = new THREE.CylinderBufferGeometry( 0.5, 0.5, 3, 14 );
        const cactus01 = new THREE.Mesh(cactusGeometry01, this.cactusMaterial);
        cactus01.position.set(0,1.5,2.2);
        blockMesh.add(cactus01);

        //braccio verticale grande
        const cactusGeometry02  = new THREE.CylinderBufferGeometry( 0.5, 0.5, 5, 14 );
        const cactus02 = new THREE.Mesh(cactusGeometry02, this.cactusMaterial);
        cactus02.position.set(0,1.9,-1.8);
        blockMesh.add(cactus02);



        const cactusGeometry03  = new THREE.CylinderBufferGeometry( 0.5, 0.5, 2, 14 );
        const cactus03 = new THREE.Mesh(cactusGeometry03, this.cactusMaterial);
        cactus03.position.set(0,3,3);
        cactus03.rotation.set(1.5,0,0);
        blockMesh.add(cactus03);


        const cactusGeometry04  = new THREE.CylinderBufferGeometry( 0.5, 0.5, 3, 14 );
        const cactus04 = new THREE.Mesh(cactusGeometry04, this.cactusMaterial);
        cactus04.position.set(0,4.2,2.2);
        blockMesh.add(cactus04);


        const cactusGeometry05  = new THREE.CylinderBufferGeometry( 0.5, 0.5, 2, 14 );
        const cactus05 = new THREE.Mesh(cactusGeometry05, this.cactusMaterial);
        cactus05.position.set(0,3,-2.5);
        cactus05.rotation.set(4.6,0,0);
        blockMesh.add(cactus05);

        const cactusGeometry06  = new THREE.CylinderBufferGeometry( 0.5, 0.5, 3, 14 );
        const cactus06 = new THREE.Mesh(cactusGeometry06, this.cactusMaterial);
        cactus06.position.set(0,4.2,-3.2);
        blockMesh.add(cactus06); 
 
        const cactusGeometry07  = new THREE.CylinderBufferGeometry( 0.5, 0.5, 3, 14 );
        const cactus07 = new THREE.Mesh(cactusGeometry07, this.cactusMaterial);
        cactus07.position.set(0,4.2,4);
        blockMesh.add(cactus07); 

        this.group.position.x = this.position.x;
        this.group.position.y = this.position.y;
        this.group.position.z = this.position.z;

        game.scene.add(this.group);

        this.blocks ++; // adding first egg

    }



    addCactus() {

        game.scene.remove(this.group);
        cactus = new Cactus(new THREE.Vector3(Math.random(-20) * 30, 2, Math.random(-60) * 30));
        cactus.build();


    }



    getPosition(){

        return this.cactus.position;
    }



    update() {


/*         var t = game.timer.getElapsedTime();

        // this.group.rotation.y = t * 16 / (2 * Math.PI);
        // this.group.rotation.z = t * 10 / (2 * Math.PI);
        // this.group.rotation.x = t * 35 / (2 * Math.PI);

        this.group.children[0].children[0].rotation.x += Math.sin(3 * t) / 250;
        this.group.children[0].children[0].position.x += Math.sin(3 * t) / 100;
        this.group.children[0].children[0].position.z += Math.sin(3 * t) / 100;

        this.group.children[0].children[1].rotation.x += Math.sin(3 * t) / 250;
        this.group.children[0].children[1].position.x += Math.sin(3 * t) / 120;
        this.group.children[0].children[1].position.z += Math.sin(3 * t) / 110;
        
        this.group.children[0].children[2].rotation.x += Math.sin(3 * t) / 250;
        this.group.children[0].children[2].position.x += Math.sin(3 * t) / 110;
        this.group.children[0].children[2].position.z += Math.sin(3 * t) / 120;
        
        this.group.children[0].children[3].rotation.x += Math.sin(3 * t) / 250;
        this.group.children[0].children[3].position.x += Math.sin(3 * t) / 110;
        this.group.children[0].children[3].position.z += Math.sin(3 * t) / 110;
 */
        // MATTEO collision box
        var BB = new THREE.Box3().setFromObject(this.group.children[0]);
        BB.name = "threeBB";    
        game.boxes.push(BB);

    
    }
}
