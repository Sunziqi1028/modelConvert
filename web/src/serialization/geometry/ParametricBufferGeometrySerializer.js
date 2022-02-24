
import BaseSerializer from '../BaseSerializer';
import BufferGeometrySerializer from './BufferGeometrySerializer';

/**
 * ParametricBufferGeometrySerializer
 
 */
class ParametricBufferGeometrySerializer extends BaseSerializer {
    toJSON(obj) {
        return BufferGeometrySerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent) {
        var obj = parent === undefined ? new THREE.ParametricBufferGeometry(
            json.parameters.func,
            json.parameters.slices,
            json.parameters.stacks
        ) : parent;

        BufferGeometrySerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default ParametricBufferGeometrySerializer;