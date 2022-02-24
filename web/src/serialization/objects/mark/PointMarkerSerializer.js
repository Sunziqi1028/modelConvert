
import BaseSerializer from '../../BaseSerializer';
import Object3DSerializer from '../../core/Object3DSerializer';
import PointMarker from '../../../object/mark/PointMarker';

/**
 * PointMarkerSerializer
 
 */
class PointMarkerSerializer extends BaseSerializer {
    toJSON(obj) {
        return Object3DSerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent, options) {
        var obj = new PointMarker(json.userData.text, {
            domWidth: options.domWidth,
            domHeight: options.domHeight
        });

        Object3DSerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default PointMarkerSerializer;