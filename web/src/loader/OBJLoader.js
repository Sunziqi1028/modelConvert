
import BaseLoader from './BaseLoader';

/**
 * OBJLoader
 
 */
class OBJLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url) {
        return new Promise(resolve => {
            this.require(['LoaderSupport', 'OBJLoader2', 'MTLLoader']).then(() => {
                var objLoader = new THREE.OBJLoader2();
                var mtlLoader = new THREE.MTLLoader();

                var promise = new Promise(resolve1 => {
                    mtlLoader.load(url.replace('.obj', '.mtl'), obj => {
                        resolve1(obj);
                    }, undefined, () => {
                        resolve1(null);
                    });

                });

                promise.then(mtl => {
                    if (mtl) {
                        mtl.preload();
                        objLoader.setMaterials(mtl.materials);
                    }

                    objLoader.load(url, obj => {
                        resolve(obj.detail.loaderRootNode);
                    }, undefined, () => {
                        resolve(null);
                    });
                });
            });
        });
    }
}

export default OBJLoader;