
/**
 * 球体
 * @param {THREE.SphereBufferGeometry} geometry 几何体
 * @param {THREE.MeshStandardMaterial} material 材质
 */
class Sphere extends THREE.Mesh {
    constructor(geometry = new THREE.SphereBufferGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI), material = new THREE.MeshStandardMaterial()) {
        super(geometry, material);
        this.name = _t('Sphere');
        this.castShadow = true;
        this.receiveShadow = true;

        this.userData.physics = this.userData.physics || {
            enabled: true,
            type: 'rigidBody',
            shape: 'btSphereShape',
            mass: 0,
            inertia: {
                x: 0,
                y: 0,
                z: 0
            }
        };
    }
}

export default Sphere;