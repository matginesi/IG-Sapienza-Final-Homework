
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

        //this.hitBoxGeometry = new THREE.SphereGeometry( 2, 16, 16);
        this.hitBoxGeometry = new THREE.CubeGeometry(4, 4, 4);
        this.hitBoxMaterial = new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            wireframe: true,
            depthTest: true,
            transparent: false,
            visible: true
        });
        
        this.blocks = 0;
    }

    build()
    {
        var hitBoxMesh = new THREE.Mesh(this.hitBoxGeometry, this.hitBoxMaterial);
        hitBoxMesh.castShadow = true;
        hitBoxMesh.receiveShadow = true;
        hitBoxMesh.name = "Food:HitBox";
        this.group.add(hitBoxMesh);

        this.group.position.x = this.position.x;
        this.group.position.y = this.position.y;
        this.group.position.z = this.position.z;

        game.scene.add(this.group);
        
        this.blocks = 1;
    }

    update()
    {
        
    }
}
