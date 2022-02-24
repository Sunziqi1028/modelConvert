
import BaseSerializer from '../BaseSerializer';
import MaterialSerializer from './MaterialSerializer';

/**
 * SpriteMaterialSerializer
 
 */
class SpriteMaterialSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = MaterialSerializer.prototype.toJSON.call(this, obj);
        json.isSpriteMaterial = true;
        return json;
    }

    fromJSON(json, parent, server) {
        var obj = parent === undefined ? new THREE.SpriteMaterial() : parent;

        MaterialSerializer.prototype.fromJSON.call(this, json, obj, server);

        return obj;
    }
}

export default SpriteMaterialSerializer;