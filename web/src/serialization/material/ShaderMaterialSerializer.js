
import BaseSerializer from '../BaseSerializer';
import MaterialSerializer from './MaterialSerializer';
import UniformsSerializer from './UniformsSerializer';

/**
 * ShaderMaterialSerializer
 
 */
class ShaderMaterialSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = MaterialSerializer.prototype.toJSON.call(this, obj);

        json.defines = obj.defines;
        json.uniforms = new UniformsSerializer().toJSON(obj.uniforms);
        json.vertexShader = obj.vertexShader;
        json.fragmentShader = obj.fragmentShader;

        json.extensions = obj.extensions;

        return json;
    }

    fromJSON(json, parent, server) {
        var obj = parent === undefined ? new THREE.ShaderMaterial() : parent;

        MaterialSerializer.prototype.fromJSON.call(this, json, obj, server);

        obj.defines = json.defines;
        obj.uniforms = new UniformsSerializer().fromJSON(json.uniforms, undefined, server);
        obj.vertexShader = json.vertexShader;
        obj.fragmentShader = json.fragmentShader;

        obj.extensions = json.extensions;

        return obj;
    }
}

export default ShaderMaterialSerializer;