
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * ExtrudeBufferGeometrySerializer
 
 */
class ExtrudeBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        // TODO

        var obj = parent === undefined ? new THREE.ExtrudeBufferGeometry(
            json.parameters.shapes,
            json.parameters.options
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default ExtrudeBufferGeometrySerializer;