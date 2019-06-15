var THREE = require('three');
var PERLIN = require('perlin-noise');

var objectContainer = [];

function OBJ(type, dim, pos, rot, buffer)
{
    this.type = type;
    this.dim = dim; //new THREE.Vector3(dim[0], dim[1], dim[2]);
    this.pos = pos; //new THREE.Vector3(pos[0], pos[1], pos[2]);
    this.rot = rot; //new THREE.Vector3(rot[0], rot[1], rot[2]);

    this.mesh = null;

    switch (this.type)
    {
        case (0): // general terrain
        default:
            var material = new THREE.MeshLambertMaterial();
            var color = 0x55DD88;
            material.color.setHex(color);
            var geometry = new THREE.BoxBufferGeometry(this.dim.x, this.dim.y, this.dim.z);
            this.Update = function()
            {
                console.log("Update: terrain");
            };
        break;
    };

    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
    this.mesh.rotation.set(this.rot.x, this.pos.y, this.pos.z);

    this.ID = buffer.length;
    buffer.push(this);
}

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

for(var i=0; i<20; i++)
{
    OBJ(0, new THREE.Vector3(1,1,1), new THREE.Vector3(i,0,i*10 + i), new THREE.Vector3(0,0,0), objectContainer);

    objectContainer[i].Update();

    console.log(objectContainer[i].mesh.position);
}
