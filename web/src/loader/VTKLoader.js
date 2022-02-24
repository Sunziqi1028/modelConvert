
import BaseLoader from './BaseLoader';

/**
 * VTKLoader
 
 */
class VTKLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url) {
        return new Promise(resolve => {
            this.require('VTKLoader').then(() => {
                var loader = new THREE.VTKLoader();

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

export default VTKLoader;