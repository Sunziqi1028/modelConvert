
import BaseLoader from './BaseLoader';

/**
 * PCDLoader
 
 */
class PCDLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url, options) { // eslint-disable-line
        return new Promise(resolve => {
            this.require('PCDLoader').then(() => {
                var loader = new THREE.PCDLoader();
                loader.load(url, mesh => {
                    resolve(mesh);
                }, undefined, () => {
                    resolve(null);
                });
            });
        });
    }
}

export default PCDLoader;