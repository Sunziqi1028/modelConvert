
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * RingBufferGeometrySerializer
 
 */
class RingBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.RingBufferGeometry(
            json.parameters.innerRadius,
            json.parameters.outerRadius,
            json.parameters.thetaSegments,
            json.parameters.phiSegments,
            json.parameters.thetaStart,
            json.parameters.thetaLength
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default RingBufferGeometrySerializer;