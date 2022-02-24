
/**
 * 纽结
 * @param {THREE.TorusKnotBufferGeometry} geometry 几何体
 * @param {THREE.MeshStandardMaterial} material 材质
 */
class TorusKnot extends THREE.Mesh {
    constructor(geometry = new THREE.TorusKnotBufferGeometry(2, 0.8, 64, 12, 2, 3), material = new THREE.MeshStandardMaterial()) {
        super(geometry, material);

        this.name = _t('Torus Knot');
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

export default TorusKnot;