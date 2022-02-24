
import BaseLoader from './BaseLoader';

/**
 * BVHLoader
 
 */
class BVHLoader extends BaseLoader {
    constructor() {
        super();
    }

    load(url, options) {
        return new Promise(resolve => {
            this.require('BVHLoader').then(() => {
                var loader = new THREE.BVHLoader();
                loader.load(url, result => {
                    var skeletonHelper = new THREE.SkeletonHelper(result.skeleton.bones[0]);
                    skeletonHelper.skeleton = result.skeleton; // allow animation mixer to bind to SkeletonHelper directly

                    var boneContainer = new THREE.Group();
                    boneContainer.add(result.skeleton.bones[0]);

                    var obj3d = new THREE.Object3D();
                    obj3d.add(skeletonHelper);
                    obj3d.add(boneContainer);

                    obj3d._obj = result;
                    obj3d._root = skeletonHelper;

                    Object.assign(obj3d.userData, {
                        animNames: 'Animation1',
                        scripts: [{
                            id: null,
                            name: `${options.Name}${_t('Animation')}`,
                            type: 'javascript',
                            source: this.createScripts(options.Name),
                            uuid: THREE.Math.generateUUID()
                        }]
                    });

                    resolve(obj3d);
                }, undefined, () => {
                    resolve(null);
                });
            });
        });
    }

    createScripts(name) {
        return `var mesh = this.getObjectByName('${name}');\n\n` +
            `var mixer = new THREE.AnimationMixer(mesh._root);\n\n` +
            `mixer.clipAction(mesh._obj.clip).setEffectiveWeight(1.0).play();` +
            `function update(clock, deltaTime) { \n     mixer.update(deltaTime); \n}`;
    }
}

export default BVHLoader;