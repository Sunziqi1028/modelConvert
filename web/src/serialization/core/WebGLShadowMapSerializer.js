
import BaseSerializer from '../BaseSerializer';

/**
 * WebGLShadowMapSerializer
 
 */
class WebGLShadowMapSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = BaseSerializer.prototype.toJSON.call(this, obj);

        json.autoUpdate = obj.autoUpdate;
        json.enabled = obj.enabled;
        json.needsUpdate = obj.needsUpdate;
        json.type = obj.type;

        return json;
    }

    fromJSON(json, parent) {
        if (parent === undefined) {
            console.warn(`WebGLShadowMapSerializer: parent is empty.`);
            return null;
        }

        var obj = parent;

        obj.autoUpdate = json.autoUpdate;
        obj.enabled = json.enabled;
        obj.needsUpdate = true;
        obj.type = json.type;

        return obj;
    }
}

export default WebGLShadowMapSerializer;