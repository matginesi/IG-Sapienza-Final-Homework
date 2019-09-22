


class Plant {

    constructor(position) {

        this.position = position;
        this.rotation = new THREE.Vector3(0, 0, 0);

        this.group = new THREE.Group();
        this.group.name = "PlantGroup";

        // this.blockGeometry = new THREE.CylinderBufferGeometry( 5, 5, 20, 32 );        
        this.blockGeometry = new THREE.CylinderBufferGeometry( 1, 2, 7, 14 );
        this.blockMaterial = new THREE.MeshPhongMaterial({
            color: 0x312A07,
            roughness: 1,
            shading: THREE.FlatShading,
            wireframe: false,
            depthTest: true,
        });


        this.foliageMaterial = new THREE.MeshStandardMaterial({
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

        // initially plant is oriented vs positive Z axis
        this.plantDirection = new THREE.Vector3(0, 0, 1);

    }

    build() {

        // MATTEO la hitbox non serve più
        /*
        var hitBoxMesh = new THREE.Mesh(this.hitBoxGeometry, this.hitBoxMaterial);
        hitBoxMesh.castShadow = true;
        hitBoxMesh.receiveShadow = true;
        hitBoxMesh.name = "Plant:HitBox";
        this.group.add(hitBoxMesh);
        */
       
        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.rotation.set(0, 0, 0);
        blockMesh.position.set(0, -5, 0);
        blockMesh.name = "Plant:Block_0";

        this.group.add(blockMesh);
        


        const foliageGeometry = new THREE.CylinderBufferGeometry( 2, 7, 5, 14 );
        const foliage = new THREE.Mesh(foliageGeometry, this.foliageMaterial);
        foliage.position.set(0,5,0);
        blockMesh.add(foliage);


        const foliageGeometry01  = new THREE.CylinderBufferGeometry( 1.5, 5, 3, 14 );
        const foliage01 = new THREE.Mesh(foliageGeometry01, this.foliageMaterial);
        foliage01.position.set(0,8,0);
        blockMesh.add(foliage01);

        const foliageGeometry02  = new THREE.CylinderBufferGeometry( 1, 4, 3, 14 );
        const foliage02 = new THREE.Mesh(foliageGeometry02, this.foliageMaterial);
        foliage02.position.set(0,11,0);
        blockMesh.add(foliage02);



        const foliageGeometry03  = new THREE.CylinderBufferGeometry( 0, 2.5, 3, 14 );
        const foliage03 = new THREE.Mesh(foliageGeometry03, this.foliageMaterial);
        foliage03.position.set(0,14,0);
        blockMesh.add(foliage03);



        this.group.position.x = this.position.x;
        this.group.position.y = this.position.y;
        this.group.position.z = this.position.z;

        game.scene.add(this.group);

        this.blocks ++; // adding first egg

    }



    addPlant() {

        game.scene.remove(this.group);
        plant = new Plant(new THREE.Vector3(Math.random(-20) * 30, 2, Math.random(-60) * 30));
        plant.build();


    }



    getPosition(){

        return this.plant.position;
    }



    update() {


        var t = game.timer.getElapsedTime();

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

        // MATTEO collision box
        var BB = new THREE.Box3().setFromObject(this.group.children[0]);
        BB.name = "threeBB";    
        game.boxes.push(BB);

    
    }
}
