
import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from './Object3DSerializer';

/**
 * BoneSerializer
 
 */
class BoneSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = Object3DSerializer.prototype.toJSON.call(this, obj);

        return json;
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.Bone() : parent;

        Object3DSerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default BoneSerializer;