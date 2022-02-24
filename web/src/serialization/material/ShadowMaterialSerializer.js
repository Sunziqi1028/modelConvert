
import BaseSerializer from '../BaseSerializer';
import MaterialSerializer from './MaterialSerializer';

/**
 * ShadowMaterialSerializer
 
 */
class ShadowMaterialSerializer extends BaseSerializer {
    toJSON(obj) {
        return MaterialSerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent, server) {
        var obj = parent === undefined ? new THREE.ShadowMaterial() : parent;

        MaterialSerializer.prototype.fromJSON.call(this, json, obj, server);

        return obj;
    }
}

export default ShadowMaterialSerializer;