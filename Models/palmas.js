class Palmas {

    constructor(position) {

        this.position = position;
        this.rotation = new THREE.Vector3(0, 0, 0);

        this.group = new THREE.Group();
        this.group.name = "PalmasGroup";

        // this.blockGeometry = new THREE.CylinderBufferGeometry( 5, 5, 20, 32 );        
        this.blockGeometry = new THREE.CylinderBufferGeometry( 0.3, 0.5 ,7, 14 );
        this.blockMaterial = new THREE.MeshPhongMaterial({
            color: 0x312A07,
            roughness: 1,
            shading: THREE.FlatShading,
            wireframe: false,
            depthTest: true,
            shadowSide: THREE.FrontSide,
            side: THREE.DoubleSide
        });


        this.palmasMaterial = new THREE.MeshStandardMaterial({
            color: 0x45E165,
            roughness: 1,
            shading: THREE.FlatShading,
            wireframe: false,
            depthTest: true,
            shadowSide: THREE.FrontSide,
            side: THREE.DoubleSide
          });
          this.skinMaterial = new THREE.MeshStandardMaterial({
            color: 0xffaf8b,
            roughness: 1,
            shading: THREE.FlatShading,
            shadowSide: THREE.FrontSide,
            side: THREE.DoubleSide
          });
          this.darkMaterial = new THREE.MeshStandardMaterial({
            color: 0x4b4553,
            roughness: 1,
            shading: THREE.FlatShading,
            shadowSide: THREE.FrontSide,
            side: THREE.DoubleSide
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
        hitBoxMesh.name = "Palmas:HitBox";
        this.group.add(hitBoxMesh);
        */
       
        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.rotation.set(0, 0, 0);
        blockMesh.position.set(0, -5, 0);
        blockMesh.name = "Palmas:Block_0";

        this.group.add(blockMesh);
        


        const palmasGeometry = new THREE.SphereGeometry( 4, 7, 7,2,1,3,2 );
        const palmas = new THREE.Mesh(palmasGeometry, this.palmasMaterial);
        palmas.position.set(0,0,0);
        palmas.rotation.set(3.1,0,0);
        blockMesh.add(palmas);


        const palmasGeometry01 = new THREE.SphereGeometry( 4, 7, 7,2,1,3,2 );
        const palmas01 = new THREE.Mesh(palmasGeometry01, this.palmasMaterial);
        palmas01.position.set(0,0,0);
        palmas01.rotation.set(3.1,0,0);
        blockMesh.add(palmas01);



        const palmasGeometry02 = new THREE.SphereGeometry( 4, 7, 7,2,1,3,2 );
        const palmas02 = new THREE.Mesh(palmasGeometry02, this.palmasMaterial);
        palmas02.position.set(0,0,0);
        palmas02.rotation.set(3.1,1.5,0);
        blockMesh.add(palmas02);


        const palmasGeometry03 = new THREE.SphereGeometry( 4, 7, 7,2,1,3,2 );
        const palmas03 = new THREE.Mesh(palmasGeometry03, this.palmasMaterial);
        palmas03.position.set(0,0,0);
        palmas03.rotation.set(3.1,3.1,0);
        blockMesh.add(palmas03);


        const palmasGeometry04 = new THREE.SphereGeometry( 4, 7, 7,2,1,3,2 );
        const palmas04 = new THREE.Mesh(palmasGeometry04, this.palmasMaterial);
        palmas04.position.set(0,0,0);
        palmas04.rotation.set(3.1,4.6,0);
        blockMesh.add(palmas04);


        this.group.position.x = this.position.x;
        this.group.position.y = this.position.y;
        this.group.position.z = this.position.z;

        game.scene.add(this.group);

        this.blocks ++; // adding first egg

    }

    addPalmas() {

        game.scene.remove(this.group);
        plant = new Palmas(new THREE.Vector3(Math.random(-20) * 30, 2, Math.random(-60) * 30));
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
        BB.name = "palmasBB";    
        game.boxes.push(BB);

    
    }
}
