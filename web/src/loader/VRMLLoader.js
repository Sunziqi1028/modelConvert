
import BaseLoader from './BaseLoader';

/**
 * VRMLLoader
 
 */
class VRMLLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url, options) { // eslint-disable-line
        return new Promise(resolve => {
            this.require(['chevrotain', 'VRMLLoader']).then(() => {
                var loader = new THREE.VRMLLoader();
                loader.load(url, obj => {
                    resolve(obj);
                }, undefined, () => {
                    resolve(null);
                });
            });
        });
    }
}

export default VRMLLoader;