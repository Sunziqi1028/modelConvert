
/**
 * 火焰
 * @param {THREE.Camera} camera 相机
 * @param {Object} options 参数
 */
class Fire extends THREE.Object3D {
    constructor(camera, options = {}) {
        super();
        VolumetricFire.texturePath = 'assets/textures/VolumetricFire/';

        var width = options.width || 2;
        var height = options.height || 4;
        var depth = options.depth || 2;
        var sliceSpacing = options.sliceSpacing || 0.5;

        var fire = new VolumetricFire(
            width,
            height,
            depth,
            sliceSpacing,
            camera
        );

        this.add(fire.mesh);

        fire.mesh.name = _t('Fire');

        this.name = _t('Fire');
        this.position.y = 2;

        Object.assign(this.userData, {
            type: 'Fire',
            fire: fire,
            width: width,
            height: height,
            depth: depth,
            sliceSpacing: sliceSpacing
        });
    }
}

export default Fire;