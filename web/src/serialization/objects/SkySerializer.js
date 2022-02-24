
import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from '../core/Object3DSerializer';
import Sky from '../../object/component/Sky';

/**
 * SkySerializer
 
 */
class SkySerializer extends BaseSerializer {
    toJSON(obj) {
        return Object3DSerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent, camera) { // eslint-disable-line
        var obj = new Sky(json);

        Object3DSerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default SkySerializer;