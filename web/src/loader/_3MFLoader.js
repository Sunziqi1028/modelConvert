
import BaseLoader from './BaseLoader';

/**
 * 3MFLoader
 
 */
class _3MFLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url) {
        return new Promise(resolve => {
            this.require('3MFLoader').then(() => {
                var loader = new THREE.ThreeMFLoader();
                loader.load(url, object => {
                    resolve(object);
                }, undefined, () => {
                    resolve(null);
                });
            });
        });
    }
}

export default _3MFLoader;