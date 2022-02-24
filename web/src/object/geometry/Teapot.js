
/**
 * 茶壶
 * @param {THREE.TeapotGeometry} geometry 几何体
 * @param {THREE.MeshStandardMaterial} material 材质
 */
class Teapot extends THREE.Mesh {
    constructor(geometry = new THREE.TeapotGeometry(3, 10, true, true, true, true, true), material = new THREE.MeshStandardMaterial()) {
        super(geometry, material);
        // 修改TeapotBufferGeometry类型错误问题，原来是BufferGeometry
        geometry.type = 'TeapotGeometry';

        // 修复TeapotBufferGeometry缺少parameters参数问题
        geometry.parameters = {
            size: 3,
            segments: 10,
            bottom: true,
            lid: true,
            body: true,
            fitLid: true,
            blinn: true
        };

        this.name = _t('Teapot');
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

export default Teapot;