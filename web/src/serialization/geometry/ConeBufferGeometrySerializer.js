
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * ConeBufferGeometrySerializer
 
 */
class ConeBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.ConeBufferGeometry(
            json.parameters.radius,
            json.parameters.height,
            json.parameters.radialSegments,
            json.parameters.heightSegments,
            json.parameters.openEnded,
            json.parameters.thetaStart,
            json.parameters.thetaLength
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default ConeBufferGeometrySerializer;