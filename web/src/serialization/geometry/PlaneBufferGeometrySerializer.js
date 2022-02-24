
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * PlaneBufferGeometrySerializer
 
 */
class PlaneBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.PlaneBufferGeometry(
            json.parameters.width,
            json.parameters.height,
            json.parameters.widthSegments,
            json.parameters.heightSegments
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default PlaneBufferGeometrySerializer;