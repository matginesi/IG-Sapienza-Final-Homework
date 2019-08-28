// Random map generator
function makeMap()
{
    var mapGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
    
    // FLAT
    /*
    var simplex = new SimplexNoise();
    for(var i=0; i<100; i++)
    {
        for(var j=0; j<100; j++)
        {
            mapGeometry.vertices[i+j*100].z = (
                (simplex.noise2D( i/100,j/100)) + 
                (simplex.noise2D( (i+200)/50,j/50)) + 
                (simplex.noise2D( (i+400)/25,j/25)) +
                (simplex.noise2D( (i+600)/12.5,j/12.5)) +
                (simplex.noise2D( (i+800)/6.25,j/6.25)) ) * 1.5;
        }
    }
    */

    // map: texture,
    var mapMaterial = new THREE.MeshPhongMaterial({
        color: 0x5555FF, 
        wireframe: false,
        depthTest: true,
        side: THREE.FrontSide,
        flatShading: THREE.FlatShading
        });
        
    var map = new THREE.Mesh(mapGeometry, mapMaterial);
    
    map.rotation.x = -Math.PI/2;
    map.castShadow = true;
    map.receiveShadow = true;
    map.position.y = 0;
    map.name = "Ground"
    
    return map;

}
