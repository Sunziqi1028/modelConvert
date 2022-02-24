
import BaseLoader from './BaseLoader';

/**
 * JsonLoader
 
 */
class JsonLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url, options) {
        return new Promise(resolve => {
            this.require([
                'LegacyJSONLoader'
            ]).then(() => {
                var loader = new THREE.LegacyJSONLoader();

                loader.load(url, (geometry, materials) => {
                    for (var i = 0; i < materials.length; i++) {
                        var m = materials[i];
                        m.skinning = true;
                        m.morphTargets = true;
                    }

                    var mesh = new THREE.SkinnedMesh(geometry, materials);

                    // TODO: 最新版three.js不再支持了
                    if (!mesh.skeleton) {
                        mesh.skeleton = {
                            update: function () {

                            }
                        };
                    }

                    mesh._obj = [geometry, materials];
                    mesh._root = mesh;

                    Object.assign(mesh.userData, {
                        scripts: [{
                            id: null,
                            name: `${options.Name}${_t('Animation')}`,
                            type: 'javascript',
                            source: this.createScripts(options.Name),
                            uuid: THREE.Math.generateUUID()
                        }]
                    });

                    resolve(mesh);
                }, undefined, () => {
                    resolve(null);
                });
            });
        });
    }

    createScripts(name) {
        return `var mesh = this.getObjectByName('${name}');\n` +
            `var mixer = new THREE.AnimationMixer(mesh)\n` +
            `mixer.clipAction(mesh.geometry.animations[0]).play();\n\n` +
            `function update(clock, deltaTime) { \n    mixer.update(deltaTime); \n}`;
    }
}

export default JsonLoader;