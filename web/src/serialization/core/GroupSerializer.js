
import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from './Object3DSerializer';

/**
 * GroupSerializer
 
 */
class GroupSerializer extends BaseSerializer {
    toJSON(obj) {
        return Object3DSerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.Group() : parent;

        Object3DSerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default GroupSerializer;