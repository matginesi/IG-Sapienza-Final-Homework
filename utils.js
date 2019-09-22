

/* Function that applies a texture specified by "location" to meshes, using
   "wrappingX" and "wrappingY" parameters.  */
function applyTex (location, wrappingX, wrappingY)
{

        var texName;


        texName = THREE.ImageUtils.loadTexture (location);
        texName.wrapS = texName.wrapT = THREE.RepeatWrapping;
        texName.repeat.set (wrappingX, wrappingY);

        return texName;

}
