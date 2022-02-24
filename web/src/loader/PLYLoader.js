
import BaseLoader from './BaseLoader';

/**
 * PLYLoader
 
 */
class PLYLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url) {
        return new Promise(resolve => {
            this.require('PLYLoader').then(() => {
                var loader = new THREE.PLYLoader();

                loader.load(url, geometry => {
                    geometry.computeVertexNormals();
                    var material = new THREE.MeshStandardMaterial();
                    var mesh = new THREE.Mesh(geometry, material);
                    resolve(mesh);
                }, undefined, () => {
                    resolve(null);
                });
            });
        });
    }
}

export default PLYLoader;