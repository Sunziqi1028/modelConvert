
/**
 * 正方体
 * @param {THREE.BoxBufferGeometry} geometry 几何体
 * @param {THREE.MeshStandardMaterial} material 材质
 */
class Box extends THREE.Mesh {
    constructor(geometry = new THREE.BoxBufferGeometry(1, 1, 1), material = new THREE.MeshStandardMaterial()) {
        super(geometry, material);
        this.name = _t('Box');
        this.castShadow = true;
        this.receiveShadow = true;

        this.userData.physics = this.userData.physics || {
            enabled: true,
            type: 'rigidBody',
            shape: 'btBoxShape',
            mass: 1,
            inertia: {
                x: 0,
                y: 0,
                z: 0
            }
        };
    }
}

export default Box;