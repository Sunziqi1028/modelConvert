
import BaseLoader from './BaseLoader';

/**
 * CTMLoader
 
 */
class CTMLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url) {
        return new Promise(resolve => {
            this.require([
                'lzma',
                'CTMLoader'
            ]).then(() => {
                var loader = new THREE.CTMLoader();

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

export default CTMLoader;