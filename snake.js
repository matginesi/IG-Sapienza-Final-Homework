class Snake
{
    constructor()
    {
        this.snakeLenght = 0;
        this.snakePosition = new THREE.Vector3(0, 2, 0);
        this.snakeRotation = new THREE.Vector3(0, 0, 0);

        this.snakeGroup = new THREE.Group();
        this.snakeGroup.name = "SnakeGroup";
        this.blockGeometry = new THREE.CubeGeometry(1, 1);
        this.blockMaterial = new THREE.MeshPhongMaterial({
            color: 0xAAFF55, 
            wireframe: false,
            depthTest: true,
        });
    }

    buildHead()
    {
        this.snakeLenght = 0;
        
        this.snakeGroup.position.x = this.snakePosition.x;
        this.snakeGroup.position.y = this.snakePosition.y;
        this.snakeGroup.position.z = this.snakePosition.z;

        this.snakeGroup.rotation.x = this.snakeRotation.x;
        this.snakeGroup.rotation.y = this.snakeRotation.y;
        this.snakeGroup.rotation.z = this.snakeRotation.z;
        
        var headGeometry = new THREE.DodecahedronGeometry(1);
        var headMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFF00, 
            wireframe: false,
            depthTest: true,
        });

        var headMesh = new THREE.Mesh(headGeometry, headMaterial);
        headMesh.castShadow = true;
        headMesh.receiveShadow = true;
        headMesh.name = "Snake:head";

        this.snakeGroup.add(headMesh);
        game.scene.add(this.snakeGroup);

        this.blocks = 1;
    }

    addBlock()
    {

        var blockMesh = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.position.z = (-1.2 * this.blocks) - 0.2;
        blockMesh.name = "Snake:Tail_" + this.blocks;

        this.snakeGroup.add(blockMesh);
        this.blocks++;
    }

    move(x, y, z)
    {

        this.snakeGroup.position.x += x;
        this.snakeGroup.position.y += y;
        this.snakeGroup.position.z += z;
        
        this.snakeGroup.children[1].rotation.x += Math.sin(x);
        this.snakeGroup.children[1].rotation.y += Math.sin(y);
        this.snakeGroup.children[1].rotation.z += Math.sin(z);

        for(var i=2; i<this.blocks; i++)
        {
            if(i%2)
            {
                this.snakeGroup.children[i].rotation.x -= Math.sin(x);
                this.snakeGroup.children[i].rotation.y -= Math.sin(y);
                this.snakeGroup.children[i].rotation.z -= Math.sin(z);
            }
            else
            {
                this.snakeGroup.children[i].rotation.x += Math.sin(x);
                this.snakeGroup.children[i].rotation.y += Math.sin(y);
                this.snakeGroup.children[i].rotation.z += Math.sin(z);
            }
        }
    }

    checkCollision()
    {
        var originPoint = this.snakeGroup.position.clone();
        originPoint.z += 1;
        var destPoint = this.snakeGroup.position.clone();
        destPoint.z -= 1;
        
        var ray = new THREE.Raycaster( originPoint, destPoint );
        //var collisionResults = ray.intersectObjects( game.scene.children );
        var collisionResults = ray.intersectObjects( game.scene.children );
        
        if ( collisionResults.length != 0)
        {
            for(var i=0; i<collisionResults.length; i++)
            {
                if(collisionResults[i].object.name == "box")
                {
                    console.log(collisionResults[i].object.name);
                    
                    return;
                }
            }
        } 
    }

    setPosition(pos, value)
    {
        if(pos == "x")
            this.snakeGroup.position.x = value;

        if(pos == "y")
            this.snakeGroup.position.y = value;

        if(pos == "z")
            this.snakeGroup.position.z = value;
    }

    update()
    {        
        this.checkCollision();

        switch(globalKeyPressed)
        {
            case(87):
                snake.move(0, 0, +0.1);
                break;

            case(83):
                snake.move(0, 0, -0.1);
                break;

            case(65):
                snake.move(+0.1, 0, 0);
                break;
            
            case(68):
                snake.move(-0.1, 0, 0);
                break;

            default:
                break;
        }
    }
};