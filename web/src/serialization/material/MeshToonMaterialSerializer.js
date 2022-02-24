
import BaseSerializer from '../BaseSerializer';
import MaterialSerializer from './MaterialSerializer';

/**
 * MeshToonMaterialSerializer
 
 */
class MeshToonMaterialSerializer extends BaseSerializer {
    toJSON(obj) {
        return MaterialSerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent, server) {
        var obj = parent === undefined ? new THREE.MeshToonMaterial() : parent;

        MaterialSerializer.prototype.fromJSON.call(this, json, obj, server);

        return obj;
    }
}

export default MeshToonMaterialSerializer;