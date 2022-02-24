
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * SphereBufferGeometrySerializer
 
 */
class SphereBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.SphereBufferGeometry(
            json.parameters.radius,
            json.parameters.widthSegments,
            json.parameters.heightSegments,
            json.parameters.phiStart,
            json.parameters.phiLength,
            json.parameters.thetaStart,
            json.parameters.thetaLength
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default SphereBufferGeometrySerializer;