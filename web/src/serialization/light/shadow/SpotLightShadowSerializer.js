
import BaseSerializer from '../../BaseSerializer';
import LightShadowSerializer from './LightShadowSerializer';

/**
 * SpotLightShadowSerializer
 
 */
class SpotLightShadowSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = LightShadowSerializer.prototype.toJSON.call(this, obj);

        json.isSpotLightShadow = obj.isSpotLightShadow;

        return json;
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.SpotLightShadow() : parent;

        LightShadowSerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default SpotLightShadowSerializer;