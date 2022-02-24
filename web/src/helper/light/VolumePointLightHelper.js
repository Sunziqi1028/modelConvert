
/**
 * 具有一定体积的点光源帮助器
 
 * @param {THREE.PointLight} light 点光源
 * @param {Number} sphereSize 发射尺寸
 * @param {Object} color 颜色
 */
class VolumePointLightHelper extends THREE.PointLightHelper {
    constructor(light, sphereSize, color) {
        super(light, sphereSize, color);

        var geometry = new THREE.SphereBufferGeometry(2, 4, 2);
        var material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            visible: false
        });

        this.picker = new THREE.Mesh(geometry, material);
        this.picker.name = 'picker';
        this.add(this.picker);
    }

    raycast(raycaster, intersects) {
        var intersect = raycaster.intersectObject(this.picker)[0];
        if (intersect) {
            intersect.object = this.light;
            intersects.push(intersect);
        }
    }

    dispose() {
        this.remove(this.picker);

        this.picker.geometry.dispose();
        this.picker.material.dispose();
        delete this.picker;

        super.dispose();
    }
}

export default VolumePointLightHelper;