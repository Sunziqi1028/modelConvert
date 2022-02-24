
/**
 * 具有一定体积的平行光帮助器
 
 * @param {THREE.DirectionalLight} light 平行光
 * @param {Number} size 尺寸
 * @param {THREE.Color} color 颜色
 */
class VolumeDirectionalLightHelper extends THREE.DirectionalLightHelper {
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

        super.dispose.call(this);
    }
}

export default VolumeDirectionalLightHelper;