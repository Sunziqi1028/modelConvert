
/**
 * 具有一定体积的半球光帮助器
 
 * @param {THREE.HemisphereLight} light 半球光
 * @param {Number} size 尺寸
 * @param {Object} color 颜色
 */
class VolumeHemisphereLightHelper extends THREE.HemisphereLightHelper {
    constructor(light, size, color) {
        super(light, size, color);
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

export default VolumeHemisphereLightHelper;