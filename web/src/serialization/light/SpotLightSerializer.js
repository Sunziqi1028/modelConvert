
import BaseSerializer from '../BaseSerializer';
import LightSerializer from './LightSerializer';

/**
 * SpotLightSerializer
 
 */
class SpotLightSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = LightSerializer.prototype.toJSON.call(this, obj);

        json.isSpotLight = obj.isSpotLight;
        json.distance = obj.distance;
        json.angle = obj.angle;
        json.penumbra = obj.penumbra;
        json.decay = obj.decay;

        return json;
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.SpotLight(
            json.color,
            json.intensity,
            json.distance,
            json.angle,
            json.penumbra,
            json.decay) : parent;

        LightSerializer.prototype.fromJSON.call(this, json, obj);

        obj.isSpotLight = json.isSpotLight;
        obj.distance = json.distance;
        obj.angle = json.angle;
        obj.penumbra = json.penumbra;
        obj.decay = json.decay;

        return obj;
    }
}

export default SpotLightSerializer;