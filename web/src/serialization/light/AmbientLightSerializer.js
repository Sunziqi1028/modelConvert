
import BaseSerializer from '../BaseSerializer';
import LightSerializer from './LightSerializer';

/**
 * AmbientLightSerializer
 
 */
class AmbientLightSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = LightSerializer.prototype.toJSON.call(this, obj);

        json.isAmbientLight = obj.isAmbientLight;

        return json;
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.AmbientLight(json.color, json.intensity) : parent;

        LightSerializer.prototype.fromJSON.call(this, json, obj);

        obj.isAmbientLight = json.isAmbientLight;

        return obj;
    }
}

export default AmbientLightSerializer;