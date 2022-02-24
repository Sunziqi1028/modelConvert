
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * TubeBufferGeometrySerializer
 
 */
class TubeBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.TubeBufferGeometry(
            json.parameters.path,
            json.parameters.tubularSegments,
            json.parameters.radius,
            json.parameters.radialSegments,
            json.parameters.closed
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default TubeBufferGeometrySerializer;