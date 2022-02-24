
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * LatheBufferGeometrySerializer
 
 */
class LatheBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.LatheBufferGeometry(
            json.parameters.points,
            json.parameters.segments,
            json.parameters.phiStart,
            json.parameters.phiLength
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default LatheBufferGeometrySerializer;