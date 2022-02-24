
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * TorusBufferGeometrySerializer
 
 */
class TorusBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.TorusBufferGeometry(
            json.parameters.radius,
            json.parameters.tube,
            json.parameters.radialSegments,
            json.parameters.tubularSegments,
            json.parameters.arc
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default TorusBufferGeometrySerializer;