
import BaseSerializer from '../../BaseSerializer';
import Object3DSerializer from '../../core/Object3DSerializer';
import ThreeDText from '../../../object/text/ThreeDText';

/**
 * ThreeDTextSerializer
 
 */
class ThreeDTextSerializer extends BaseSerializer {
    toJSON(obj) {
        return Object3DSerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) { // eslint-disable-line
        var obj = new ThreeDText(json.userData.text, json.userData);

        Object3DSerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default ThreeDTextSerializer;