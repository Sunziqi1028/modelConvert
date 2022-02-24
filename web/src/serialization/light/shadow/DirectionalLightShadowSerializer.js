
import BaseSerializer from '../../BaseSerializer';
import LightShadowSerializer from './LightShadowSerializer';

/**
 * DirectionalLightShadowSerializer
 
 */
class DirectionalLightShadowSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = LightShadowSerializer.prototype.toJSON.call(this, obj);

        json.isDirectionalLightShadow = obj.isDirectionalLightShadow;

        return json;
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.DirectionalLightShadow() : parent;

        LightShadowSerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default DirectionalLightShadowSerializer;