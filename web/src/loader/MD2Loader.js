
import BaseLoader from './BaseLoader';

/**
 * MD2Loader
 
 */
class MD2Loader extends BaseLoader {
    constructor() {
        super();
    }

    load(url) {
        return new Promise(resolve => {
            this.require('MD2Loader').then(() => {
                var loader = new THREE.MD2Loader();

                loader.load(url, geometry => {
                    var material = new THREE.MeshStandardMaterial({
                        morphTargets: true,
                        morphNormals: true
                    });

                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.mixer = new THREE.AnimationMixer(mesh);

                    resolve(mesh);
                }, undefined, () => {
                    resolve(null);
                });
            });
        });
    }
}

export default MD2Loader;