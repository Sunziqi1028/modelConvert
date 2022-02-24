
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * PolyhedronBufferGeometrySerializer
 
 */
class PolyhedronBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.PolyhedronBufferGeometry(
            json.parameters.vertices,
            json.parameters.indices,
            json.parameters.radius,
            json.parameters.detail
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default PolyhedronBufferGeometrySerializer;