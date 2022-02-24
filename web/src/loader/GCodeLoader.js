
import BaseLoader from './BaseLoader';

/**
 * GCodeLoader
 
 */
class GCodeLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url, options) { // eslint-disable-line
        return new Promise(resolve => {
            this.require('GCodeLoader').then(() => {
                var loader = new THREE.GCodeLoader();

                loader.load(url, obj3d => {
                    resolve(obj3d);
                }, undefined, () => {
                    resolve(null);
                });
            });
        });
    }
}

export default GCodeLoader;