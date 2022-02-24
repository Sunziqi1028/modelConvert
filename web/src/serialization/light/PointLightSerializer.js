
import BaseSerializer from '../BaseSerializer';
import LightSerializer from './LightSerializer';

/**
 * PointLightSerializer
 
 */
class PointLightSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = LightSerializer.prototype.toJSON.call(this, obj);

        json.isPointLight = obj.isPointLight;
        json.distance = obj.distance;
        json.decay = obj.decay;

        return json;
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.PointLight(json.color, json.intensity, json.distance, json.decay) : parent;

        LightSerializer.prototype.fromJSON.call(this, json, obj);

        obj.isPointLight = json.isPointLight;

        return obj;
    }
}

export default PointLightSerializer;