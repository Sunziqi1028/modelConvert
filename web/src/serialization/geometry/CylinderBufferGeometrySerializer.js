
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * CylinderBufferGeometrySerializer
 
 */
class CylinderBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.CylinderBufferGeometry(
            json.parameters.radiusTop,
            json.parameters.radiusBottom,
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

export default CylinderBufferGeometrySerializer;