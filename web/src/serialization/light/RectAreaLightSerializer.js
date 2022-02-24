
import BaseSerializer from '../BaseSerializer';
import LightSerializer from './LightSerializer';

/**
 * RectAreaLightSerializer
 
 */
class RectAreaLightSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = LightSerializer.prototype.toJSON.call(this, obj);

        json.width = obj.width;
        json.height = obj.height;

        return json;
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.RectAreaLight(json.color, json.intensity, json.width, json.height) : parent;

        LightSerializer.prototype.fromJSON.call(this, json, obj);

        obj.isRectAreaLight = true;

        return obj;
    }
}

export default RectAreaLightSerializer;