var cloudGeometry = [];
for (var deg = 0; deg <= 180; deg += 6) {
    var rad = Math.PI * deg / 180;
    var point = new THREE.Vector2((0.92 + .08 * Math.cos(rad)) * Math.sin(rad), - Math.cos(rad) ); // the "egg equation"
    cloudGeometry.push(point);
}

class Cloud {

    constructor(position) {

        this.position = position;
        this.rotation = new THREE.Vector3(0, 0, 0);

        this.group = new THREE.Group();
        this.group.name = "CloudGroup";

        // this.blockGeometry = new THREE.LatheBufferGeometry(cloudGeometry, 50);        
        this.blockGeometry = new THREE.OctahedronBufferGeometry(1, 1);
        this.blockMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: false,
            depthTest: false,
            transparent: true,
            opacity: 0.70,
            fog: true
        });

        this.skyMaterial = new THREE.MeshBasicMaterial({
            color: 0xFAFFFF,
            wireframe: false,
            depthTest: true,
          });

          this.skygreyMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: false,
            depthTest: true,
          });
          this.skinMaterial = new THREE.MeshBasicMaterial({
            color: 0xffaf8b,
            wireframe: false,
            depthTest: true,
          });
          this.darkMaterial = new THREE.MeshStandardMaterial({
            color: 0x4b4553,
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

        this.rayCaster = new THREE.Raycaster();

        // initially cloud is oriented vs positive Z axis
        this.cloudDirection = new THREE.Vector3(0, 0, 1);
    }

    build() {


        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.rotation.set(0, 0, 0);
        blockMesh.position.set(0, 0, 0);
        blockMesh.name = "Cloud:Block_0";

        this.group.add(blockMesh);
        


        const woolGeometry = new THREE.OctahedronBufferGeometry(1.5, 1);
        const wool = new THREE.Mesh(woolGeometry, this.blockMaterial);
        wool.position.set(0, 0, 0.07);
        wool.rotation.x = 0.35;
        this.group.add(wool);


        // Group01: piccola davanti a tutti
        const woolGeometry02 = new THREE.OctahedronBufferGeometry(0.55, 1);
        const wool02 = new THREE.Mesh(woolGeometry02, this.blockMaterial);
        wool02.position.set(3, 0, -3.2);
        this.group.add(wool02);

        // Group02:  gruppo grande - piccola dietro a tutti a dx
        const woolGeometry02b = new THREE.OctahedronBufferGeometry(0.95, 1);
        const wool02b = new THREE.Mesh(woolGeometry02b, this.blockMaterial);
        wool02b.position.set(-1, 0, 5.2);
        this.group.add(wool02b);

        // piccola dietro a tutti a sx
        const woolGeometry02c = new THREE.OctahedronBufferGeometry(0.75, 1);
        const wool02c = new THREE.Mesh(woolGeometry02c, this.blockMaterial);
        wool02c.position.set(-1, 0, -1);
        wool02b.add(wool02c);

      // gruppo da 5 grande la seconda
        const woolGeometry03  = new THREE.OctahedronBufferGeometry(1.1, 1);
        const wool03 = new THREE.Mesh(woolGeometry03, this.blockMaterial);
        wool03.position.set(1, 0, -1);
        this.group.add(wool03);

      // gruppo da 5 grande la terza
        const woolGeometry04  = new THREE.OctahedronBufferGeometry(2, 1);
        const wool04 = new THREE.Mesh(woolGeometry, this.blockMaterial);
        wool04.position.set(-1, 0, 1.2);
        this.group.add(wool04);


        
      // gruppo da 5 grande la prima
        const woolGeometry05 = new THREE.OctahedronBufferGeometry(1.28, 1);
        const wool05 = new THREE.Mesh(woolGeometry05, this.blockMaterial);
        wool05.position.set(1.5, 0, -2);
        this.group.add(wool05);

      // il gruppo da 2 dietro - grande
        const woolGeometry06 = new THREE.OctahedronBufferGeometry(1.28, 1);
        const wool06 = new THREE.Mesh(woolGeometry06, this.blockMaterial);
        wool06.position.set(2.5, 0, 2.2);
        this.group.add(wool06);

      // il gruppo da 2 dietro - piccola
        const woolGeometry06b = new THREE.OctahedronBufferGeometry(1.5, 1);
        const wool06b = new THREE.Mesh(woolGeometry06b, this.blockMaterial);
        wool06b.position.set(1, 0, 1);
        wool06.add(wool06b);


      // il gruppo da 2 dietro - piccola        
        const woolGeometry07 = new THREE.OctahedronBufferGeometry(1.4, 1);
        const wool07 = new THREE.Mesh(woolGeometry07, this.blockMaterial);
        wool07.position.set(-3.5, 0, 5.2);
        this.group.add(wool07);

        const woolGeometry08 = new THREE.OctahedronBufferGeometry(0.4, 1);
        const wool08 = new THREE.Mesh(woolGeometry08, this.blockMaterial);
        wool08.position.set(1, 0, 1);
        wool07.add(wool08);

        // piccola davanti a sx
        const woolGeometry01 = new THREE.OctahedronBufferGeometry(1, 1);
        const wool01 = new THREE.Mesh(woolGeometry01, this.blockMaterial);
        wool01.position.set(-1.4, 0, 0.7);
        wool07.add(wool01);


        
      this.group.position.x = this.position.x;
      this.group.position.y = this.position.y;
      this.group.position.z = this.position.z;


        game.scene.add(this.group);

        this.blocks = 1; // adding first cloud

    }


    movecloud(x, y, z) {
        /*
            Impartisce i comandi alla testa
            Aggiunto per pulizia e per usi futuri (if WallHit then goRight)  
        */
        

        this.cloudGroup.children[0].position.x += x;
        this.cloudGroup.children[0].position.y += y;
        this.cloudGroup.children[0].position.z += z;

/*         this.cloudGroup.children[0].children[1].position.x = 3;
        this.cloudGroup.children[0].children[2].position.x = 3; */


    }


    addCloud() {

        cloud = new Cloud(new THREE.Vector3(Math.random(-10) * 10, 2, Math.random(-10) * 10));
        cloud.build();

    }

    update() {
        
      var velocityair = 5;

      this.group.position.x += (0.02)/velocityair;
      this.group.position.z += (0.02)/velocityair;


      this.group.children[3].position.x += (0.0051)/velocityair;
      this.group.children[3].position.z += (0.0051)/velocityair;

      this.group.children[7].position.x += (0.01)/velocityair;
      this.group.children[7].position.z += (0.01)/velocityair;
      
      this.group.children[8].position.x += (0.0075)/velocityair;
      this.group.children[8].position.z += (0.0075)/velocityair;

      var BB = new THREE.Box3().setFromObject(this.group);
      BB.name = "cloudBB";    
      game.boxes.push(BB);

      if (Math.abs(this.group.position.x) > 30) {
        this.addCloud;
      }
    
    }
}
