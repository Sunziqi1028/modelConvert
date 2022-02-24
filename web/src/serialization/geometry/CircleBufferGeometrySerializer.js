
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * CircleBufferGeometrySerializer
 
 */
class CircleBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.CircleBufferGeometry(
            json.parameters.radius,
            json.parameters.segments,
            json.parameters.thetaStart,
            json.parameters.thetaLength
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default CircleBufferGeometrySerializer;