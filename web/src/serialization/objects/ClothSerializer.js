
import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from '../core/Object3DSerializer';
import Cloth from '../../object/component/Cloth';

/**
 * ClothSerializer
 
 */
class ClothSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = Object3DSerializer.prototype.toJSON.call(this, obj);

        return json;
    }

    fromJSON(json, parent, camera) { // eslint-disable-line
        var cloth = new Cloth();

        Object3DSerializer.prototype.fromJSON.call(this, json, cloth);

        return cloth;
    }
}

export default ClothSerializer;