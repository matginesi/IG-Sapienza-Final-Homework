
class Food
{
    constructor(position)
    {
        this.position = position;
        this.rotation = new THREE.Vector3(0, 0, 0);

        this.group = new THREE.Group();
        this.group.name = "FoodGroup";
        
        this.blockGeometry = new THREE.CubeGeometry(1, 1);
        this.blockMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFAA55, 
            wireframe: false,
            depthTest: true,
        });

        this.hitBoxGeometry = new THREE.SphereGeometry( 2, 16, 16);
        this.hitBoxMaterial = new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            wireframe: true,
            depthTest: true,
            transparent: true,
            opacity: 0.4,
            visible: true
        });
        this.rayCaster = new THREE.Raycaster();    
    }

    build()
    {
        var hitBoxMesh = new THREE.Mesh(this.hitBoxGeometry, this.hitBoxMaterial);
        hitBoxMesh.castShadow = true;
        hitBoxMesh.receiveShadow = true;
        hitBoxMesh.name = "Food:HitBox";
        this.group.add(hitBoxMesh);

        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.name = "Food:Block_0";
        this.group.add(blockMesh);

    
        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.name = "Food:Block_1";
        
        blockMesh.rotation.x = 90 / (Math.PI/2);
        blockMesh.rotation.z = 90 / (Math.PI/2);
        blockMesh.position.x = +10;
        blockMesh.position.y = +1;
        blockMesh.position.z = +1;
        this.group.add(blockMesh);

        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.name = "Food:Block_2";
        
        blockMesh.rotation.x = 180 / (Math.PI/2);
        blockMesh.rotation.z = 180 / (Math.PI/2);
        blockMesh.position.x = -10;
        blockMesh.position.y = +1;
        blockMesh.position.z = +1;
        this.group.add(blockMesh);

        this.group.position.x = this.position.x;
        this.group.position.y = this.position.y;
        this.group.position.z = this.position.z;

        game.scene.add(this.group);
    }





    //TO IMPLEMENT BETTER
    /*randomFood() {

            var height = 100;
            var width = 100;

            var posX = Math.floor(Math.random() * height / 2); 
            posX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; 

            var posZ = Math.floor(Math.random() * width / 2);
            posZ *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; 


            this.group.position.x = posX;
            
            this.group.position.z = posZ; 
        }*/







    update()
    {
        //GRUPPO DI OGGETTI CIBO
        var t = game.timer.getElapsedTime();
        //food.randomFood();
        //this.group.rotation.y = t*25/(2*Math.PI);
        //this.group.rotation.z = t*10/(2*Math.PI);
        //this.group.rotation.x = t*35/(2*Math.PI);
        
        //this.group.position.y +=100;       
    }
}
