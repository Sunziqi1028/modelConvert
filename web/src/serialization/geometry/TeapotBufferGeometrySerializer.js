
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * TeapotBufferGeometrySerializer
 
 */
class TeapotBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.TeapotGeometry(
            json.parameters.size,
            json.parameters.segments,
            json.parameters.bottom,
            json.parameters.lid,
            json.parameters.body,
            json.parameters.fitLid,
            json.parameters.blinn
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default TeapotBufferGeometrySerializer;