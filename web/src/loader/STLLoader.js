
import BaseLoader from './BaseLoader';

/**
 * STLLoader
 
 */
class STLLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url) {
        return new Promise(resolve => {
            this.require('STLLoader').then(() => {
                var loader = new THREE.STLLoader();

                loader.load(url, geometry => {
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

export default STLLoader;