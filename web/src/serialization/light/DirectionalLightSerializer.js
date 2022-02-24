
import BaseSerializer from '../BaseSerializer';
import LightSerializer from './LightSerializer';

/**
 * DirectionalLightSerializer
 
 */
class DirectionalLightSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = LightSerializer.prototype.toJSON.call(this, obj);

        json.isDirectionalLight = obj.isDirectionalLight;

        return json;
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.DirectionalLight(json.color, json.intensity) : parent;

        LightSerializer.prototype.fromJSON.call(this, json, obj);

        obj.isDirectionalLight = json.isDirectionalLight;

        return obj;
    }
}

export default DirectionalLightSerializer;