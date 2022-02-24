
import BaseLoader from './BaseLoader';

/**
 * SEA3DLoader
 
 */
class SEA3DLoader extends BaseLoader {
    constructor(props) {
        super(props);
    }

    load(url, options) {
        var obj = new THREE.Object3D();

        return new Promise(resolve => {
            this.require('SEA3D').then(() => {
                var loader = new THREE.SEA3D({
                    autoPlay: true, // Auto play animations
                    container: obj, // Container to add models
                    progressive: true // Progressive download
                });

                loader.onComplete = function () {
                    resolve(obj);
                };

                loader.load(url);

                Object.assign(obj.userData, {
                    animNames: ['Animation1'],
                    scripts: [{
                        id: null,
                        name: `${options.Name}${_t('Animation')}`,
                        type: 'javascript',
                        source: this.createScripts(options.Name),
                        uuid: THREE.Math.generateUUID()
                    }]
                });
            });
        });
    };

    createScripts(name) { // eslint-disable-line
        return `function update(clock, deltaTime) { \n    THREE.SEA3D.AnimationHandler.update(deltaTime); \n}`;
    }
}

export default SEA3DLoader;