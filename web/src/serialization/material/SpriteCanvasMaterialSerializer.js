
import BaseSerializer from '../BaseSerializer';
import MaterialSerializer from './MaterialSerializer';

/**
 * SpriteCanvasMaterialSerializer
 
 */
class SpriteCanvasMaterialSerializer extends BaseSerializer {
    toJSON(obj) {
        return MaterialSerializer.prototype.toJSON.call(this, obj);
    }

    fromJSON(json, parent, server) {
        var obj = parent === undefined ? new THREE.SpriteCanvasMaterial() : parent;

        MaterialSerializer.prototype.fromJSON.call(this, json, obj, server);

        return obj;
    }
}

export default SpriteCanvasMaterialSerializer;