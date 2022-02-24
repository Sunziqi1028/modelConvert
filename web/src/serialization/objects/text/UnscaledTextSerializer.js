
import BaseSerializer from '../../BaseSerializer';
import Object3DSerializer from '../../core/Object3DSerializer';
import UnscaledText from '../../../object/text/UnscaledText';

/**
 * UnscaledTextSerializer
 
 */
class UnscaledTextSerializer extends BaseSerializer {
    toJSON(obj) {
        return Object3DSerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent, options) {
        var obj = new UnscaledText(json.userData.text, {
            domWidth: options.domWidth,
            domHeight: options.domHeight
        });

        Object3DSerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default UnscaledTextSerializer;