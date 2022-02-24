
import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from '../core/Object3DSerializer';

/**
 * LightSerializer
 
 */
class LightSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = Object3DSerializer.prototype.toJSON.call(this, obj);

        json.color = obj.color;
        json.intensity = obj.intensity;
        json.isLight = obj.isLight;
        // json.shadow = !obj.shadow ? null : new LightShadowsSerializer().toJSON(obj.shadow);

        return json;
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.Light() : parent;

        Object3DSerializer.prototype.fromJSON.call(this, json, obj);

        obj.color = new THREE.Color(json.color);
        obj.intensity = json.intensity;
        obj.isLight = json.isLight;

        // if (json.shadow) {
        //     obj.shadow = new LightShadowsSerializer().fromJSON(json.shadow);
        // }

        return obj;
    }
}

export default LightSerializer;