var THREE = require('three');
var perlin = require('perlin-noise');

function OBJ(type, dim, pos, rot, buffer, i, j)
{
    this.type = type;
    this.dim = dim;
    this.pos = pos;
    this.rot = rot;

    this.geometry = new THREE.BoxGeometry(this.dim[0], this.dim[1], this.dim[2]);
    var col = 0xFFFFFF;

    switch(this.type)
    {
        case 0:
        default:
            switch(this.pos[1])
            {
                case(0):
                    col = 0x333333;
                break;

                case (1):
                    col = 0xBB5000;
                break;
                case (2):
                    col = 0x22AA00;
                break;
                case (3):
                    col = 0x00FF00;
                break;
                default:
                    col = 0xDDDDDD;
                break;
            }

            this.material = new THREE.MeshPhongMaterial({
                    flatShading: THREE.FlatShading,
                    transparent: true,
                    opacity: 0.9
            });

            this.material.color.setHex( col );
        break;
    }
    
    this.cube = new THREE.Mesh( this.geometry, this.material );
    this.cube.position.set(this.pos[0], this.pos[1], this.pos[2]);
    this.cube.rotation.set(this.rot[0], this.rot[1], this.rot[2]);

    buffer[[i][j]] = this.cube;
    this.ID = buffer.length;
}


var maxX = 100;
var maxY = 100;
var globalBlockContainer = [[maxX], [maxY]];


var rndData = perlin.generatePerlinNoise(100, 100);
for(var i=0 in rndData) rndData[i] *= 6;  
for(var i=0; i<100; i++)
{
    for(var j=0; j<100; j++)
    {
        var block = new OBJ(
            rndData[j + i*100],
            [1,1,1],
            [i, rndData[j + i*100], j],
            [0, 0, 0],
            globalBlockContainer, i, j);  
    }
}

console.log(rndData);