import BaseLoader from './BaseLoader';

/**
 * 3DSLoader
 */
class _3DSLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url) {
        return new Promise(resolve => {
            this.require('TDSLoader').then(() => {
                var loader = new THREE.TDSLoader();
                loader.load(url, group => {
                    resolve(group);
                }, undefined, () => {
                    resolve(null);
                });
            });
        });
    }
}

export default _3DSLoader;