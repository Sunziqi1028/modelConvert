
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * TetrahedronBufferGeometrySerializer
 
 */
class TetrahedronBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.TetrahedronBufferGeometry(
            json.parameters.radius,
            json.parameters.detail
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default TetrahedronBufferGeometrySerializer;