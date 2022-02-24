
import BaseSerializer from '../BaseSerializer';
import LightSerializer from './LightSerializer';

/**
 * HemisphereLightSerializer
 
 */
class HemisphereLightSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = LightSerializer.prototype.toJSON.call(this, obj);

        json.isHemisphereLight = obj.isHemisphereLight;
        json.skyColor = obj.skyColor;
        json.groundColor = obj.groundColor;

        return json;
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.HemisphereLight(json.skyColor, json.groundColor, json.intensity) : parent;

        LightSerializer.prototype.fromJSON.call(this, json, obj);

        obj.isHemisphereLight = json.isHemisphereLight;

        return obj;
    }
}

export default HemisphereLightSerializer;