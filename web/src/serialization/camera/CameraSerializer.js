
import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from '../core/Object3DSerializer';

/**
 * CameraSerializer
 
 */
class CameraSerializer extends BaseSerializer {
    filter(obj) {
        if (obj instanceof THREE.Camera) {
            return true;
        } else if (obj.metadata && obj.metadata.generator === this.constructor.name) {
            return true;
        } else {
            return false;
        }
    }

    toJSON(obj) {
        return Object3DSerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.Camera() : parent;

        Object3DSerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default CameraSerializer;