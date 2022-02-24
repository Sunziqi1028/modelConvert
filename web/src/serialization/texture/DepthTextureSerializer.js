
import BaseSerializer from '../BaseSerializer';
import TextureSerializer from './TextureSerializer';

/**
 * DepthTextureSerializer
 
 */
class DepthTextureSerializer extends BaseSerializer {
    toJSON(obj) {
        return TextureSerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent, server) {
        var obj = parent === undefined ? new THREE.DataTexture() : parent;

        TextureSerializer.prototype.fromJSON.call(this, json, obj, server);

        return obj;
    }
}

export default DepthTextureSerializer;