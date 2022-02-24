
import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from '../core/Object3DSerializer';
import Fire from '../../object/component/Fire';

/**
 * FireSerializer
 
 */
class FireSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = Object3DSerializer.prototype.toJSON.call(this, obj);

        delete json.userData.fire;

        return json;
    }

    fromJSON(json, parent, camera) { // eslint-disable-line
        var fire = new Fire(camera, {
            width: json.userData.width,
            height: json.userData.height,
            depth: json.userData.depth,
            sliceSpacing: json.userData.sliceSpacing
        });

        Object3DSerializer.prototype.fromJSON.call(this, json, fire);

        fire.userData.fire.update(0);

        return fire;
    }
}

export default FireSerializer;