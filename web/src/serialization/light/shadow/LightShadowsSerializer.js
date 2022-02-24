
import BaseSerializer from '../../BaseSerializer';

import LightShadowSerializer from './LightShadowSerializer';
import DirectionalLightShadowSerializer from './DirectionalLightShadowSerializer';
import SpotLightShadowSerializer from './SpotLightShadowSerializer';

const Serializers = {
    'LightShadow': LightShadowSerializer,
    'DirectionalLightShadow': DirectionalLightShadowSerializer,
    'SpotLightShadow': SpotLightShadowSerializer
};

/**
 * LightShadowsSerializer
 
 */
class LightShadowsSerializer extends BaseSerializer {
    toJSON(obj) {
        var serializer = Serializers[obj.constructor.name];

        if (serializer === undefined) {
            console.warn(`LightShadowsSerializer: No serializer with  ${obj.constructor.name}.`);
            return null;
        }

        return new serializer().toJSON(obj);
    }

    fromJSON(json) {
        var generator = json.metadata.generator;

        var serializer = Serializers[generator.replace('Serializer', '')];

        if (serializer === undefined) {
            console.warn(`LightShadowsSerializer: No deserializer with ${generator}.`);
            return null;
        }

        return new serializer().fromJSON(json);
    }
}

export default LightShadowsSerializer;