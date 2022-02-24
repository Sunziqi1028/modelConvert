
/**
 * 圆
 * @param {THREE.CircleBufferGeometry} geometry 几何体
 * @param {THREE.MeshStandardMaterial} material 材质
 */
class Circle extends THREE.Mesh {
    constructor(geometry = new THREE.CircleBufferGeometry(1, 32), material = new THREE.MeshStandardMaterial()) {
        super(geometry, material);
        this.name = _t('Circle');
        this.castShadow = true;
        this.receiveShadow = true;

        this.userData.physics = this.userData.physics || {
            enabled: true,
            type: 'rigidBody',
            shape: 'btBoxShape',
            mass: 1.0,
            inertia: {
                x: 0,
                y: 0,
                z: 0
            }
        };
    }
}

export default Circle;