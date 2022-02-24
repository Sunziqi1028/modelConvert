
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * BoxBufferGeometrySerializer
 
 */
class BoxBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.BoxBufferGeometry(
            json.parameters.width,
            json.parameters.height,
            json.parameters.depth,
            json.parameters.widthSegments,
            json.parameters.heightSegments,
            json.parameters.depthSegments
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default BoxBufferGeometrySerializer;