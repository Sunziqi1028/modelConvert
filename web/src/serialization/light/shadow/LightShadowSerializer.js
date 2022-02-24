
import BaseSerializer from '../../BaseSerializer';
import CamerasSerializer from '../../camera/CamerasSerializer';
import WebGLRenderTargetSerializer from '../../core/WebGLRenderTargetSerializer';

/**
 * LightShadowSerializer
 
 */
class LightShadowSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = BaseSerializer.prototype.toJSON.call(this, obj);

        json.bias = obj.bias;
        json.camera = new CamerasSerializer().toJSON(obj.camera);
        json.map = !obj.map ? null : new WebGLRenderTargetSerializer().toJSON(obj.map);
        json.mapSize = obj.mapSize;
        json.radius = obj.radius;

        return json;
    }

    fromJSON(json, parent) {
        var camera = new CamerasSerializer().fromJSON(json.camera);

        var obj = parent === undefined ? new THREE.LightShadow(camera) : parent;

        obj.bias = json.bias;
        obj.camera.copy(camera);
        obj.mapSize.copy(json.mapSize);
        obj.radius = json.radius;

        return obj;
    }
}

export default LightShadowSerializer;