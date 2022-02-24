
import BaseSerializer from '../BaseSerializer';
import MeshSerializer from '../core/MeshSerializer';
import Smoke from '../../object/component/Smoke';

/**
 * SmokeSerializer
 
 */
class SmokeSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = MeshSerializer.prototype.toJSON.call(this, obj);

        return json;
    }

    fromJSON(json, parent, camera, renderer) {
        var obj = parent || new Smoke(camera, renderer, json.userData);

        MeshSerializer.prototype.fromJSON.call(this, json, obj);

        obj.update(0);

        return obj;
    }
}

export default SmokeSerializer;