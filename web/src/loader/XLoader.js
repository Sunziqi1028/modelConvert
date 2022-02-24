
import BaseLoader from './BaseLoader';

/**
 * XLoader
 
 */
class XLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url, options) { // eslint-disable-line
        return new Promise(resolve => {
            this.require('XLoader').then(() => {
                var loader = new THREE.XLoader();
                loader.load([url], object => {
                    var obj = new THREE.Object3D();

                    for (var i = 0; i < object.models.length; i++) {
                        var model = object.models[i];
                        obj.add(model);
                    }

                    resolve(obj);
                }, undefined, () => {
                    resolve(null);
                });
            });
        });
    }
}

export default XLoader;