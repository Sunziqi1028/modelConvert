
/**
 * 轮胎
 * @param {THREE.TorusBufferGeometry} geometry 几何体
 * @param {THREE.MeshStandardMaterial} material 材质
 */
class Torus extends THREE.Mesh {
    constructor(geometry = new THREE.TorusBufferGeometry(2, 1, 32, 32, Math.PI * 2), material = new THREE.MeshStandardMaterial()) {
        super(geometry, material);
        this.name = _t('Torus');
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

export default Torus;