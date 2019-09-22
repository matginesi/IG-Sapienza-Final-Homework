

class Cloudsmall {

  constructor(position) {

    this.position = position;
    this.rotation = new THREE.Vector3(0, 0, 0);

    this.group = new THREE.Group();
    this.group.name = "CloudsmallGroup";

    // this.blockGeometry = new THREE.LatheBufferGeometry(cloudsmallGeometry, 50);        
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

    // initially cloudsmall is oriented vs positive Z axis
    this.cloudsmallDirection = new THREE.Vector3(0, 0, 1);
  }

  build() {


    var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
    blockMesh.castShadow = true;
    blockMesh.receiveShadow = true;
    blockMesh.rotation.set(0, 0, 0);
    blockMesh.name = "Cloudsmall:Block_0";

    this.group.add(blockMesh);




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

    const woolGeometry08 = new THREE.OctahedronBufferGeometry(0.8, 1);
    const wool08 = new THREE.Mesh(woolGeometry08, this.blockMaterial);
    wool08.position.set(1, 0, 1);
    wool07.add(wool08);


    this.group.position.x = this.position.x;
    this.group.position.y = this.position.y;
    this.group.position.z = this.position.z;


    game.scene.add(this.group);

    this.blocks = 1; // adding first cloudsmall

  }


  movecloudsmall(x, y, z) {
    /*
        Impartisce i comandi alla testa
        Aggiunto per pulizia e per usi futuri (if WallHit then goRight)  
    */


    this.cloudsmallGroup.children[0].position.x += x;
    this.cloudsmallGroup.children[0].position.y += y;
    this.cloudsmallGroup.children[0].position.z += z;

    /*         this.cloudsmallGroup.children[0].children[1].position.x = 3;
            this.cloudsmallGroup.children[0].children[2].position.x = 3; */


  }


  addCloudsmall() {

    cloudsmall = new Cloudsmall(new THREE.Vector3(Math.random(-10) * 10, 2, Math.random(-10) * 10));
    cloudsmall.build();

    globalKeyPressed = null;

  }





  update() {

    var velocityair = 6;

    this.group.position.x += (0.02) / velocityair;
    this.group.position.z += (0.02) / velocityair;

    this.group.children[0].position.x += (0.0051) / velocityair;
    this.group.children[0].position.z += (0.0051) / velocityair;

    this.group.children[1].position.x += (0.01) / velocityair;
    this.group.children[1].position.z += (0.01) / velocityair;

    var BB = new THREE.Box3().setFromObject(this.group);
    BB.name = "cloudsmallBB";
    game.boxes.push(BB);


    // quando escono dal game le rimettiamo in gioco

  
  }
}
