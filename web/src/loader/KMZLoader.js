
import BaseLoader from './BaseLoader';

/**
 * KMZLoader
 
 */
class KMZLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url) {
        return new Promise(resolve => {
            this.require([
                'ColladaLoader',
                'KMZLoader'
            ]).then(() => {
                var loader = new THREE.KMZLoader();

                loader.load(url, collada => {
                    var obj3d = collada.scene;
                    resolve(obj3d);
                }, undefined, () => {
                    resolve(null);
                });
            });
        });
    }
}

export default KMZLoader;