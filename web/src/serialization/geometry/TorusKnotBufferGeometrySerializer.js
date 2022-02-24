
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * TorusKnotBufferGeometrySerializer
 
 */
class TorusKnotBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.TorusKnotBufferGeometry(
            json.parameters.radius,
            json.parameters.tube,
            json.parameters.tubularSegments,
            json.parameters.radialSegments,
            json.parameters.p,
            json.parameters.q
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default TorusKnotBufferGeometrySerializer;