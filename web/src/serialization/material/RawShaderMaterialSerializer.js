
import BaseSerializer from '../BaseSerializer';
import MaterialSerializer from './MaterialSerializer';
import UniformsSerializer from './UniformsSerializer';

/**
 * RawShaderMaterialSerializer
 
 */
class RawShaderMaterialSerializer extends BaseSerializer {

    toJSON(obj) {
        var json = MaterialSerializer.prototype.toJSON.call(this, obj);

        json.defines = obj.defines;
        json.uniforms = new UniformsSerializer().toJSON(obj.uniforms);
        json.vertexShader = obj.vertexShader;
        json.fragmentShader = obj.fragmentShader;

        return json;
    }

    fromJSON(json, parent, server) {
        var obj = parent === undefined ? new THREE.RawShaderMaterial() : parent;

        MaterialSerializer.prototype.fromJSON.call(this, json, obj, server);

        obj.defines = json.defines;
        obj.uniforms = new UniformsSerializer().fromJSON(json.uniforms, undefined, server);
        obj.vertexShader = json.vertexShader;
        obj.fragmentShader = json.fragmentShader;

        return obj;
    }
}

export default RawShaderMaterialSerializer;