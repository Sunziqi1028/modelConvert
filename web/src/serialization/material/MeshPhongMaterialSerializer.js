
import BaseSerializer from '../BaseSerializer';
import MaterialSerializer from './MaterialSerializer';

/**
 * MeshPhongMaterialSerializer
 
 */
class MeshPhongMaterialSerializer extends BaseSerializer {
    toJSON(obj) {
        let json = MaterialSerializer.prototype.toJSON.call(this, obj);

        json.specular = obj.specular;
        json.shininess = obj.shininess;

        return json;
    }

    fromJSON(json, parent, server) {
        var obj = parent === undefined ? new THREE.MeshPhongMaterial() : parent;

        MaterialSerializer.prototype.fromJSON.call(this, json, obj, server);

        obj.specular = new THREE.Color(json.specular);
        obj.shininess = json.shininess;

        return obj;
    }
}

export default MeshPhongMaterialSerializer;