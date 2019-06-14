var THREE = require('three');
var PERLIN = require('perlin-noise');

var globalBlockContainer = [];

function OBJ(type, dim, pos, rot, buffer)
{
    this.type = type;
    this.dim = dim;
    this.pos = pos;
    this.rot = rot;

    this.geometry = new THREE.BoxBufferGeometry(this.dim[0], this.dim[1], this.dim[2]);
    //this.geometry = new THREE.BoxGeometry(this.dim[0], this.dim[1], this.dim[2]);
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
                case (2):
                case (3):
                    col = 0xBBAA00;
                break;
                case (4):
                case (5):
                    col = 0x10AA50;
                break;
                case (6):
                case (7):
                    col = 0xBB5010;
                break;
                
                default:
                    col = 0xDDDDDD;
                break;
            }

            
            this.material = new THREE.MeshPhongMaterial({
                    flatShading: THREE.FlatShading,
                    transparent: true,
                    opacity: 0.58
            });
            
            //this.material = new THREE.MeshLambertMaterial();  // faster!
            this.material.color.setHex( col );
        break;
    }
    
    this.cube = new THREE.Mesh( this.geometry, this.material );
    this.cube.position.set(this.pos[0], this.pos[1], this.pos[2]);
    this.cube.rotation.set(this.rot[0], this.rot[1], this.rot[2]);

    buffer.push(this.cube);
    this.ID = buffer.length;
}

var rndData = PERLIN.generatePerlinNoise(100, 100);
for(var i=0 in rndData) rndData[i] = Math.floor(0.6 + rndData[i] * 12);  
for(var i=0; i<100; i++)
{
    for(var j=0; j<100; j++)
    {
        var block = new OBJ(
            rndData[j + i*100],
            [1,1,1],
            [i, rndData[j + i*100], j],
            [0, 0, 0],
            globalBlockContainer);  
    }
}

/*
0  1  2  3  4  5
6  7  8  9  10 11
12 13 14 15 16 17
18 19 20 21 22 23
24 25 26 27 28 29

maxX = 6
maxY = 5

v=16, x=4, y=3
*/
function valueToXY(value, max_x, max_y)
{
    var r = [Math.floor(value%max_x), Math.floor((value%max_x)%max_y)];
    return r;
}

function XYtoValue(x, y, max_x)
{
    var r = x*max_x + y;
    return r;
}
console.log(valueToXY(7, 6, 5));
console.log(XYtoValue(1,1,6,5));
//console.log(globalBlockContainer);