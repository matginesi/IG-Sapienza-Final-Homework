// Random map generator
function makeMap()
{
    var mapGeometry = new THREE.PlaneBufferGeometry(45, 50, 50, 50); //refactored: coincidono col terreno
    
    // FLAT

    // map: texture,
    var mapMaterial = new THREE.MeshPhongMaterial({
        color: 0x5555FF, 
        wireframe: false,
        depthTest: true,
        side: THREE.FrontSide,
        flatShading: THREE.FlatShading,
        castShadow: true,
        receiveShadow: true
        });
        
    var map = new THREE.Mesh(mapGeometry, mapMaterial);
    
    map.rotation.x = -Math.PI/2;
    map.castShadow = true;
    map.receiveShadow = true;
    map.position.y = 0;
    map.name = "Ground"
    
    return map;
}
