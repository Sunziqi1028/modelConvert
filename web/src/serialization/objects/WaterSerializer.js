
import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from '../core/Object3DSerializer';
import Water from '../../object/component/Water';

/**
 * WaterSerializer
 
 */
class WaterSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = Object3DSerializer.prototype.toJSON.call(this, obj);
        return json;
    }

    fromJSON(json, parent, renderer) {
        var obj = new Water(renderer);

        Object3DSerializer.prototype.fromJSON.call(this, json, obj);

        obj.update();

        return obj;
    }
}

export default WaterSerializer;