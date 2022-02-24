
import BaseSerializer from '../BaseSerializer';
import MaterialSerializer from './MaterialSerializer';

/**
 * MeshNormalMaterialSerializer
 
 */
class MeshNormalMaterialSerializer extends BaseSerializer {
    toJSON(obj) {
        return MaterialSerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent, server) {
        var obj = parent === undefined ? new THREE.MeshNormalMaterial() : parent;

        MaterialSerializer.prototype.fromJSON.call(this, json, obj, server);

        return obj;
    };
}

export default MeshNormalMaterialSerializer;